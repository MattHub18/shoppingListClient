import {AppInitialState} from "../AppInitialState";
import {DataState} from "./DataState";
import {dataReducer} from "./data.reducers";
import {readList, writeList, deleteList, getList, readListSuccess, readListFail, writeListSuccess, writeListFail, deleteListSuccess, deleteListFail, getListSuccess, getListFail} from "./data.actions";

describe('data store', ()=>{
  let initialState:DataState;

  beforeEach(() => {
     initialState = AppInitialState.data;
  });

  it('read', ()=>{
    const newState = dataReducer(initialState, readList())
    expect(newState).toEqual(initialState)
  });

  it('read success', ()=>{
    const newState = dataReducer(initialState, readListSuccess({data:[]}))
    expect(newState).toEqual({
      isRead: true,
      isWritten: false,
      isDeleted: false,
      isGot: false,
      data: [],
      error: null
    });
  });

  it('read fail', ()=>{
    const newState = dataReducer(initialState, readListFail({error:"error"}))
    expect(newState).toEqual({
      isRead: false,
      isWritten: false,
      isDeleted: false,
      isGot: false,
      data: null,
      error:"error"
    });
  });

  it('write', ()=>{
    const newState = dataReducer(initialState, writeList({datetime:"2024-03-05"}))
    expect(newState).toEqual(initialState)
  });

  it('write success', ()=>{
    const newState = dataReducer(initialState, writeListSuccess())
    expect(newState).toEqual({
      isRead: false,
      isWritten: true,
      isDeleted: false,
      isGot: false,
      data: null,
      error:null
    });
  });

  it('write fail', ()=>{
    const newState = dataReducer(initialState, writeListFail({error:"error"}))
    expect(newState).toEqual({
      isRead: false,
      isWritten: false,
      isDeleted: false,
      isGot: false,
      data: null,
      error:"error"
    });
  });

  it('delete', ()=>{
    const newState = dataReducer(initialState, deleteList({id:1}))
    expect(newState).toEqual(initialState)
  });

  it('delete success', ()=>{
    const newState = dataReducer(initialState, deleteListSuccess())
    expect(newState).toEqual({
      isRead: false,
      isWritten: false,
      isDeleted: true,
      isGot: false,
      data: null,
      error:null
    });
  });

  it('delete fail', ()=>{
    const newState = dataReducer(initialState, deleteListFail({error:"error"}))
    expect(newState).toEqual({
      isRead: false,
      isWritten: false,
      isDeleted: false,
      isGot: false,
      data: null,
      error:"error"
    });
  });

  it('get', ()=>{
    const newState = dataReducer(initialState, getList({id:1}))
    expect(newState).toEqual(initialState)
  });

  it('get success', ()=>{
    const newState = dataReducer(initialState, getListSuccess({data:[]}))
    expect(newState).toEqual({
      isRead: false,
      isWritten: false,
      isDeleted: false,
      isGot: true,
      data: [],
      error:null
    });
  });

  it('get fail', ()=>{
    const newState = dataReducer(initialState, getListFail({error:"error"}))
    expect(newState).toEqual({
      isRead: false,
      isWritten: false,
      isDeleted: false,
      isGot: false,
      data: null,
      error:"error"
    });
  });
})
