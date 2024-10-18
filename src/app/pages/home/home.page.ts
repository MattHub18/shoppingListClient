import {Component, OnDestroy, OnInit} from '@angular/core';
import {IonDatetime, IonModal, ToastController} from "@ionic/angular";
import {Subscription} from "rxjs";
import {ToastComponent} from "../../components/toast/toast.component";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/AppState";
import {DataState} from "../../store/data/DataState";
import {readList, writeList, deleteList, getList} from "../../store/data/data.actions";
import {Router} from "@angular/router";
import {tokenValidity} from "../../store/token/token.actions";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  lists: any
  private dataStateSubscription: Subscription;
  private toast: ToastComponent;

  constructor(private store: Store<AppState>, toastController: ToastController, private router: Router) {
    this.store.dispatch(tokenValidity());
    this.toast = new ToastComponent(toastController)
    this.store.dispatch(readList());
  }

  ngOnInit(): void {
    if (!this.dataStateSubscription) {
      this.dataStateSubscription = this.store.select('data').subscribe(state => {
        this.onIsRead(state);
        this.onIsWritten(state);
        this.onIsDeleted(state);
        this.onIsGot(state);
        this.onError(state);
      })
    }
  }

  ngOnDestroy(): void {
    if (this.dataStateSubscription) {
      this.dataStateSubscription.unsubscribe();
    }
  }

  openList(id: number) {
    this.store.dispatch(getList({id: this.lists[id].id}));
  }

  removeList(id: number) {
    this.store.dispatch(deleteList({id: this.lists[id].id}));
  }

  insertList(modal: IonModal, datetime: IonDatetime) {
    datetime.confirm().then(() => {
      this.store.dispatch(writeList({datetime: <string>datetime.value}));
    });
    modal.dismiss().catch((err) => this.toast.presentToast(err));
  }

  private onIsRead(state: DataState) {
    if (state.isRead)
      this.lists = state.data;
  }

  private onIsWritten(state: DataState) {
    if (state.isWritten) {
      this.toast.presentToast('Lista creata', "primary")
      this.store.dispatch(readList());
    }
  }

  private onIsDeleted(state: DataState) {
    if (state.isDeleted) {
      this.toast.presentToast('Lista eliminata', 'primary')
      this.store.dispatch(readList());
    }
  }

  private onIsGot(state: DataState) {
    if (state.isGot)
      this.router.navigate(['list'], {'state': state.data}).catch((err) => this.toast.presentToast(err));
  }

  private onError(state: DataState) {
    if (state.error)
      this.toast.presentToast(state.error)
  }
}
