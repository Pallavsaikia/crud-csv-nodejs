import React from 'react'
import './TableDesign.css'

interface TableProps {
    listObject: any[],
    actiontext: string,
    callback: (data: any) => void
}





export function Table({ listObject, actiontext, callback }: TableProps) {

    function getFields(object: any) {
        return Object.keys(object)
    }
    function tableHeader(object: any) {
        const headerList = getFields(object)
        const headersUIList = []
        headersUIList.push(<th key={-1} scope="col">#</th>)
        for (let i = 0; i < headerList.length; i++) {
            headersUIList.push(<th key={i} scope="col">{headerList[i]}</th>)
        }
        headersUIList.push(<th key={headerList.length} scope="col">Actions</th>)

        return headersUIList
    }
    function getRow(object: any, headerList: string[], actiontext: string) {
        const rowList: any = []
        for (let i = 0; i < headerList.length; i++) {
            rowList.push(<td key={i}>{object[headerList[i]]}</td>)
        }
        rowList.push(<td key={headerList.length}><p key={headerList.length} className='action-text' onClick={() => { callback(object) }}>{actiontext}</p></td>)
        return rowList
    }
    function tableBody(listObject: any[], actiontext: string) {
        if (listObject.length > 0) {
            const bodyList = []
            const headerList = getFields(listObject[0])
            for (let i = 0; i < listObject.length; i++) {
                bodyList.push(
                    <tr key={i}>
                        <th key={i} scope="row">{i + 1}</th>
                        {getRow(listObject[i], headerList, actiontext)}
                    </tr>


                )
            }
            return bodyList
        }


    }
    if (listObject.length > 0) {
        return (
            <table className="table">
                <thead>
                    <tr>
                        {tableHeader(listObject[0])}
                    </tr>
                </thead>
                <tbody>
                    {tableBody(listObject, actiontext)}
                </tbody>
            </table>
        )
    } else {
        return (<></>)
    }

}
