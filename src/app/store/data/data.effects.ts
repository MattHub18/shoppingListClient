import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {DataService} from "../../services/data/data.service";
import {of} from "rxjs";
import {catchError, map, switchMap} from "rxjs/operators";
import {
  readList,
  readListSuccess,
  readListFail,
  writeList,
  writeListSuccess,
  writeListFail,
  deleteList,
  deleteListSuccess,
  getList,
  getListSuccess,
  getListFail,
  deleteListFail,
  insertList,
  insertListSuccess,
  insertListFail, removeList, removeListSuccess, removeListFail
} from "./data.actions";

@Injectable()
export class DataEffects {
  constructor(private actions:Actions, private service:DataService) {}

  /** data effects, choose action to call based on service.list/create/delete/retrieve() result **/

  $read = createEffect(() => this.actions.pipe(
    ofType(readList),
    switchMap(() => this.service.list().pipe(
      map((data:any) => readListSuccess({data})),
      catchError((error) => of(readListFail({error})))
    ))
  ))

  $write = createEffect(() => this.actions.pipe(
    ofType(writeList),
    switchMap((payload:{datetime:string}) => this.service.create(payload.datetime).pipe(
      map(() => writeListSuccess()),
      catchError((error) => of(writeListFail({error})))
    ))
  ))

  $delete = createEffect(() => this.actions.pipe(
    ofType(deleteList),
    switchMap((payload:{id:number}) => this.service.delete(payload.id).pipe(
      map(() => deleteListSuccess()),
      catchError((error) => of(deleteListFail({error})))
    ))
  ))

  $get = createEffect(() => this.actions.pipe(
    ofType(getList),
    switchMap((payload:{id:number}) => this.service.retrieve(payload.id).pipe(
      map((data:any) => getListSuccess({data})),
      catchError((error) => of(getListFail({error})))
    ))
  ))

  $insert = createEffect(() => this.actions.pipe(
    ofType(insertList),
    switchMap((payload:{item:any}) => this.service.insert(payload.item).pipe(
      map(() => insertListSuccess()),
      catchError((error) => of(insertListFail({error})))
    ))
  ))

  $remove = createEffect(() => this.actions.pipe(
    ofType(removeList),
    switchMap((payload:{id:number}) => this.service.remove(payload.id).pipe(
      map(() => removeListSuccess()),
      catchError((error) => of(removeListFail({error})))
    ))
  ))
}
