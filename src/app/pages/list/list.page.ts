import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/AppState";
import {ToastController} from "@ionic/angular";
import {Subscription} from "rxjs";
import {ToastComponent} from "../../components/toast/toast.component";
import {DataState} from "../../store/data/DataState";
import {getList, insertList, removeList} from "../../store/data/data.actions";
import {ListPageForm} from "./form/list.page.form";

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit, OnDestroy {

  list:any;
  id:number;
  listForm: FormGroup;
  private dataStateSubscription:Subscription;
  private toast:ToastComponent;

  constructor(private router:Router, private formBuilder:FormBuilder, private store:Store<AppState>,toastController:ToastController) {
    let data = this.router.getCurrentNavigation().extras.state;
    this.list = data['data']
    this.id = data['id']
    this.toast = new ToastComponent(toastController)
    this.listForm = new ListPageForm(this.formBuilder).createForm();
  }

  ngOnInit() {
    if(!this.dataStateSubscription)
      this.dataStateSubscription = this.store.select('data').subscribe(state =>{
        this.onInserted(state);
        this.onRemoved(state);
        this.onUpdated(state);
        this.onError(state);
      });
  }

  ngOnDestroy() {
    if(this.dataStateSubscription)
      this.dataStateSubscription.unsubscribe();
  }

  removeItem(id: number) {
    this.store.dispatch(removeList({id:this.list[id].id}));
  }

  insert() {
    this.store.dispatch(insertList({item:{isle:this.listForm.get('isle').value, name:this.listForm.get('item').value, shoppingListId:this.id}}));
  }

  private onInserted(state: DataState) {
    if(state.isWritten) {
      this.toast.presentToast('Lista aggiornata', 'primary')
      this.store.dispatch(getList({id:this.id}));
      this.listForm.reset();
    }
  }

  private onRemoved(state: DataState) {
    if(state.isDeleted) {
      this.toast.presentToast('Prodotto eliminato', 'primary')
      this.store.dispatch(getList({id:this.id}));
    }
  }

  private onUpdated(state: DataState) {
    if (state.isGot){
      this.list = state.data['data']
      this.id = state.data['id']
    }
  }

  private onError(state: DataState) {
    if(state.error)
      this.toast.presentToast(state.error)
  }
}
