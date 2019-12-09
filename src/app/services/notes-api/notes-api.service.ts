import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';     // 14-238 Generating the AWS signature

import { RequestSigner} from 'aws4';

declare const API_ROOT: string;
declare const STAGE: string;

@Injectable()
export class NotesApiService {
    options;
    constructor(private httpClient: HttpClient,
        private authService: AuthService) {}        // AuthService - 14-238 Generating the AWS signature
   

    setOptions(path = '/', method = '', body = '') {    // Default to call root and no method or body

        const host = new URL(API_ROOT)  // 14-238 Generating the AWS signature

        let args =  {                   // AWS options - 14-238 Generating the AWS signature
            service: 'execute-api',
            region: 'eu-west-2',
            hostname: host.hostname,
            path: path,
            method: method,
            body: body,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        } 

        // Depending on the verb/method, there will or won't be a body to the HTTP Request , and various headers
        if (method == 'GET')
        {
            delete args.body;
        }

        this.options = {};
                /*
                headers: {                
                app_user_id: 'test_user',
                app_user_name: 'Test User'
                // hard-coded login values left in prior to 14-237 (good job I used these as suggested while using in section 12?)
                }
                */
        try {
            // Get AWS credentials JSON/object from where *hopefully* stored in localStorage (Angular)
            let savedCredsJson = this.authService.getCredentials();

            //let savedCreds;
            if (savedCredsJson)
            {
                let savedCreds = JSON.parse(savedCredsJson);  // scope problem?
                //savedCreds = JSON.parse(savedCredsJson);
                            // (Separate to args) The aws4 RequestSigner is expecting objects ((i) of AWS options, (ii) of AWS credential values) as argument
                let creds = {
                    acessKeyId: savedCreds.Credentials.AccessKeyId,
                    secretAccessKey: savedCreds.Credentials.secretKey,
                    sessionToken: savedCreds.Credentials.sessionToken
                };
                let signer = new RequestSigner(args, creds);
                let signed = signer.sign();     // sign a HTTP request as defined by 1st args to RequestSigner, with credentials creds    
            
            // Turn AWS credentials to an object (from JSON)


            this.options.headers = signed.headers;      // AWS-required headers (signed) will be placed in the app's HTTP Request headers
            // NB Host header is not recommended for AWS, but may have been automatically included, so remove any Host header
            // https://forums.aws.amazon.com/thread.jspa?threadID=287930
            delete this.options.headers.Host;

            // no longer hard coding the id & name!
            this.options.headers.app_user_id = savedCreds.IdentityId;
            this.options.headers.app_user_name = savedCreds.user_name;  // gotten from decoded JWT in back-end
            }
        } catch (err)
        {
            // do nothing really
        }          
    }

    addNote(item) {
        let path = STAGE + '/note';
        let endpoint = API_ROOT + path;
        
        let itemData;
        itemData = {
            content: item.content,
            cat: item.cat
        };

        if(item.title != "") {
            itemData.title = item.title;
        }

        let reqBody = {
            Item: itemData
        };
        //this.setOptions();       // 14-239 using altered setOptions  - Signing AWS Requests
        this.setOptions(path, 'POST', JSON.stringify(reqBody));
        return this.httpClient.post(endpoint, reqBody, this.options);
    }

    updateNote(item) {
        let path = STAGE + '/note';
        let endpoint = API_ROOT + path;
        
        let itemData;
        itemData = {
            content: item.content,
            cat: item.cat,
            timestamp: parseInt(item.timestamp),
            note_id: item.note_id
        };

        if (item.title != "") {
            itemData.title = item.title;
        }

        let reqBody = {
            Item: itemData
        };
        //this.setOptions();
        this.setOptions(path, 'PATCH', JSON.stringify(reqBody));
        
        return this.httpClient.patch(endpoint, reqBody, this.options);
    }

    deleteNote(timestamp) {
        let path = STAGE + '/note/t/' + timestamp;
        let endpoint = API_ROOT + path;
        this.setOptions(path, 'DELETE');
        return this.httpClient.delete(endpoint, this.options);
    }

    getNotes(start?): Observable<any> {
        let path = STAGE + '/notes?limit=8';
        
        if (start > 0) {
            path += '&start=' + start;
        }
        let endpoint = API_ROOT + path;
        this.setOptions(path, 'GET');       // 14-239 using altered setOptions  - Signing AWS Requests
        return this.httpClient.get(endpoint, this.options);
    }
}