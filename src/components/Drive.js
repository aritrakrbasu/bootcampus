import React from 'react'
import {db} from '../routes/firebase'
var gapi= window.gapi;

async function Drive (action)
{
    gapi.load('client', async function () {
        gapi.client.load('drive', 'v3',async function (){
            switch(action.type)
           {
                case 'UPLOAD_FILE' :
                    var uploadfileres = await uploadFile(action);
                    return uploadfileres
                default :
                 return true ;
           }
        })
    })

}

async function uploadFile(item)
{
    var form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(item.metadata)], {type: 'application/json'}));
    form.append('file', item.file);
    var result = fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
                        method: 'POST',
                        headers: new Headers({'Authorization': 'Bearer ' + gapi.auth.getToken().access_token}),
                        body: form
                        }).then((res) => {
                            
                            console.log(res);
                            return res.json();
                            }).then(function(val) {

                                gapi.client.drive.files.get({
                                    fileId: val.id,
                                    fields: 'embedLink'
                                }).then(function(success){
                                    console.log(success)
                                    var embedLink = success.result.embedLink;    
                                    if(item.firebase)
                                    {
                                        switch(item.firebase.type)
                                        {
                                            case 'UPDATE':
                                                    var dbRef = db.collection(item.firebase.collection).doc(item.firebase.doc);
                                                    dbRef.update({
                                                        [item.firebase.feild]: embedLink
                                                    })

                                            default:
                                                return false
                                            
                                        }
                                    }
                                }, function(fail){
                                    console.log('Error '+ fail.result.error.message);
                                })
                            });
}

export default Drive;