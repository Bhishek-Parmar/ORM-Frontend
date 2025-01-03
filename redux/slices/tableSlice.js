import { createSlice } from "@reduxjs/toolkit";

const initialTable = {
    createTable: {
        status: null,
        error: null,
        data: null,
    },

    getAllTables: {
        status: null,
        error: null,
        data: null,
    },

    updateTable: {
        status: null,
        error: null,
        data: null,
    },

    deleteTable: {
        status: null,
        error: null,
        data: null,
    },
};

const tableSlice = createSlice({
    name: "table",
    initialState: initialTable,
    reducers: {
         //updating table on receiving first order from Ebly
         updateTableOnFirstOrder : (state, action) => {
             const order = action.payload
             if(order.isFirstOrder){
                console.log("first Order")
                state.getAllTables.data.tables = state.getAllTables.data?.tables?.map((table)=>{
                    if(table._id.toString() == order.tableId._id.toString()){
                        console.log("on first order table status changed")
                        return {...table, status : 'occupied' };
                    }else{
                        return table;
                    }
                })
             }
         },

        // Insert updated  table
        insertUpdatedTable : (state, action) => {
            const updatedTable = action.payload
            console.log("insertUpdatedTable : ", updatedTable);
            if(!state?.getAllTables?.data.tables){
                state.getAllTables.data.tables = [];
                state.getAllTables.data.tables.push = (updatedTable)
            }else{
                console.log("Entered in else block--------")
                state.getAllTables.data.tables = state.getAllTables.data.tables.map((table)=>{
                    if (table._id.toString() == updatedTable._id.toString()) return updatedTable;
                    else return table
                })
            }
        },


        // createTable
        createTableRequest: (state) => {
            state.createTable.status = "pending";
        },
        createTableSuccess: (state, action) => {
            state.createTable.status = "success";
            state.createTable.data = action.payload;
            // state.getAllTables.data.tables =  state.getAllTables.data.tables.map((table)=>{
            //     if(table._id == action.payload.table._id) return action.payload.table
            //     else return table
            // })
            if(!state?.getAllTables?.data?.tables) state.getAllTables.data = {tables:[]};
            state.getAllTables.data.tables.push(action.payload.table);

        },
        createTableFailure: (state, action) => {
            state.createTable.status = "failed";
            state.createTable.error = action.payload;
        },

        // getAllTables
        getAllTablesRequest: (state) => {
            state.getAllTables.status = "pending";
        },
        getAllTablesSuccess: (state, action) => {
            state.getAllTables.status = "success";
            state.getAllTables.data = action.payload;
        },
        getAllTablesFailure: (state, action) => {
            state.getAllTables.status = "failed";
            state.getAllTables.error = action.payload;
        },

        // updateTable
        updateTableRequest: (state) => {
            state.updateTable.status = "pending";
        },
        updateTableSuccess: (state, action) => {
            state.updateTable.status = "success";
            state.updateTable.data = action.payload;
            state.getAllTables.data.tables = state.getAllTables.data.tables.map((table) => {
                if (table._id === action.payload.table._id) {
                    return action.payload.table;
                } else {
                    return table;
                }
            });
        },
        updateTableFailure: (state, action) => {
            state.updateTable.status = "failed";
            state.updateTable.error = action.payload;
        },

        // deleteTable
        deleteTableRequest: (state) => {
            state.deleteTable.status = "pending";
        },
        deleteTableSuccess: (state, action) => {
            state.deleteTable.status = "success";
            console.log("tabel in redux ----", )
            state.getAllTables.data.tables = state.getAllTables.data.tables.filter(
                (table) => table._id !== action.payload.table._id
            );
        },
        deleteTableFailure: (state, action) => {
            state.deleteTable.status = "failed";
            state.deleteTable.error = action.payload;
        },

        // Manual state cleaners
        clearGetAllTablesStatus : (state)=>{
            state.getAllTables.status = null;
        },
        clearGetAllTablesError : (state)=>{
            state.getAllTables.error = null;
        },

        clearCreateTableStats: (state) => {
            state.createTable.status = null;
            state.createTable.error = null;
            state.createTable.data = null;
        },


        clearUpdateTableStats: (state) => {
            state.updateTable.status = null;
            state.updateTable.error = null;
            state.updateTable.data = null;
        },

        clearDeleteTableStats: (state) => {
            state.deleteTable.status = null;
            state.deleteTable.error = null;
            state.deleteTable.data = null;
        },
    },
});

export const tableActions = tableSlice.actions;
export const tableReducer = tableSlice.reducer;
