import { Options, Vue } from 'vue-class-component';
import { AgGridVue } from "ag-grid-vue3";  // the AG Grid Vue Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
ModuleRegistry.registerModules([ClientSideRowModelModule]);

@Options({
    // untuk bikin props, emits, components
    // Lalu di sini kita deklarasi emit di sini
    name: "App",
    components: {
        'ag-grid-vue': AgGridVue,
    },

})

export default class Blank extends Vue {

    // Nanti kita bikin $emit di sini
    // data() {
    //     return {
    columnDefs: any = null;
    rowData: any = null;
    gridApi: any = null;
    rowSelection: any = null
    columnTypes: any = null;
    defaultColDef: any = null;
    columnApi: any = null;
    gridColumnApi: any = null;
    getRowId: any = null;
    newCount: number = 1;

    // defaultColDef: {
    //     width: 150,
    //     editable: true,
    //     filter: 'agTextColumnFilter',
    //     floatingFilter: true,
    //     resizable: true
    // }
    // defaultColGroupDef: any = null
    //     };
    // }

    beforeMount() {
        this.columnDefs = [
            // rightAligned: bikin colom align ke kanan
            // { headerName: 'Col A', field: "make", type: 'rightAligned' },
            { field: "make" },
            // memberikan type pada column yg nantinya akan diedit/diolah di bagian created()
            { field: "model", type: 'editableColumn' },
            // menambahkan filter pada column
            { field: "price", filter: 'agNumberColumnFilter' },
            // memberikan type pada column dlm bentuk array
            { field: "date", type: ['dateColumn', 'nonEditableColumn'] },
            // { field: "make" },
            // { field: "model" },
            // { field: "price" },
            // { field: "date" },
        ];

        // this.rowData = [
        //     { make: "Toyota", model: "Celica", price: 35000, date: "21-02-2022" },
        //     { make: "Ford", model: "Mondeo", price: 32000, date: "21-02-2022" },
        //     { make: "Porsche", model: "Boxster", price: 72000, date: "21-02-2022" },
        // ];

    }

    created() {
        // di dlm columnType bisa memuat: type of column, filter, kyk kelas di css yaa (yg 'this.blabla)
        // menentukan kolom yg pengen dihias
        // semua variable (columnTypes, defaultColDef) nanti dipanggil di tampilan biar bisa berjalan css-nya
        this.columnTypes = {
            nonEditableColumn: { editable: false },
            // add filter pada column dg type datecolumn
            dateColumn: {
                filter: 'agDateColumnFilter',
                // bikin form filter otomatis muncul di kolom
                // floatingFilter: true,
                // filterParams: { comparator: myDateComparator },
                // Bikin colomn jadi dragable
                // suppressMenu: true
            }
        }

        // secara default bikin filter berdasarkan text ke seluruh kolom
        // set default semua hiasan pada semua kolom
        this.defaultColDef = {
            editable: true,
            filter: 'agTextColumnFIlter'
        }

        // this.rowData = this.getData();
        this.rowSelection = 'multiple';
    }

    // belum
    getRowData() {
        const rowData: any = [];
        this.gridApi.forEachNode(function (node: any) {
            rowData.push(node.data);
        });
        console.log('Row Data')
        console.table(rowData)
    }

    clearData() {
        this.gridApi.setRowData([]);
    }

    addItems(addIndex: any) {
        const newItems = [
            this.createNewRowData(),
            this.createNewRowData()
        ]
        // const newItems: any = [];
        // // const node: any = this.createNewRowData()
        // this.gridApi.forEachNode(function (node: any) {
        //     newItems.push(node.data);
        // })
        // this.createNewRowData(),

        const res = this.gridApi.applyTransaction({
            add: newItems,
            addIndex: addIndex,
        });
        this.printResult(res);
    }

    onRemoveSelected() {
        const selectedData: any = this.gridApi.getSelectedRows();
        const res: any = this.gridApi.applyTransaction({ remove: selectedData });
        this.printResult(res);
    }

    onGridReady(params: any) {
        // params.api = params >> berupa objek, jadi kita akses api di dalam params
        // menurutku : params itu kayak cara untuk akses objek yg ada di dlm params
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi
        // console.log(params.columnApi)

        // fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        //     .then((resp) => resp.json())
        // .then((data) => updateData(data));
    }

    createNewRowData = () => {
        const newData = {
            make: 'Toyota' + this.newCount,
            model: 'Celica' + this.newCount,
            price: 35000,
            date: '01-01-2022',
        }

        // const newData = [
        //     {
        //         make: 'Toyota',
        //         model: 'Celica',
        //         price: 35000,
        //         date: '01-01-2022',
        //     },
        //     {
        //         make: 'Toyota',
        //         model: 'Celica',
        //         price: 35000,
        //         date: '01-01-2022',
        //     }
        // ]
        console.log(newData)
        // this.newCount++;
        return newData
    }

    printResult = (res: any) => {
        console.log('---------------------------------------');
    }

    // getData = () => {
    //     const requestedRows = this.createNewRowData().slice();
    //     return {
    //         success: true,
    //         rows: requestedRows
    //     }
    // }
    // onCellClicked = (params: any) => console.log('hiii')
}
