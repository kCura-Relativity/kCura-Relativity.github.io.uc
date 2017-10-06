﻿##REPLACE WITH LOCATION TO DROP REPOSITORIES.JSON FILE
$local_json_file_location = 'C:\DEV\repository-list\repositories.json'

#ACB: READ ORGS FROM LOCAL FILE (TODO: CONFIRM FILE PATH)
$org_list_path = 'C:\DEV\organization-list\organizations.json'
$partner_orgs = (Get-Content -Path $orgListPath | ConvertFrom-Json)

#ACB: GET ORGS THAT ARE NOT BLANK
$valid_partner_orgs = $partner_orgs | Where-Object { $_ -ne '' } 

##GITHUB API URL
$githubUrl = 'https://api.github.com/'

##RELATIVITYDEV ORG
$org = 'relativitydev'

##OAUTH APPLICATION CLIENTID AND CLIENT SECRET FROM GITHUB ACCOUNT SETTINGS
$client_id ='##############'
$client_secret = '########################'

##CHECK RATE LIMIT URL
$rate_limit_uri = [System.String]::Format('{0}rate_limit?client_id={1}&client_secret={2}', $githubUrl, $client_id, $client_secret)

##GET RATE LIMIT RESULTS
$rate_limit = Invoke-RestMethod -Uri $rate_limit_uri

##IF THE RATE LIMIT HAS NOT BE EXCEEDED, GET THE RELATIVITYDEV REPOS
if ($rate_limit -and $rate_limit.rate -and $rate_limit.rate.remaining -gt 0){
    
    ##CREATING AN ARRAY TO STORE REPOSITORIES.JSON COLLECTION ITEMS
    $repositoryModels = New-Object System.Collections.Generic.List[System.Object]

    foreach($org in $valid_partner_orgs) {

    ##CONCAT VALID ORG GET URI
    $uri = [System.String]::Format('{0}orgs/{1}/repos?client_id={2}&client_secret={3}', $githubUrl, $org, $client_id, $client_secret)

    ##GET REPOSITORIES FOR ORG
    $org_repos = Invoke-RestMethod -Uri $uri

        ##LOOP THROUGH THE GET ORG REPOSITORIES RESULTS
        ##THIS WILL HAVE THE MOST RECENT/UPDATED ORG REPOSITORY INFO
        foreach($repo in $org_repos) {

        ##CREATE REPOSITORY OBJECT FOR REPOSITORIES.JSON FILE
            $repositoryItem = @{
                id = $repo.id
                name = $repo.name
                full_name = $repo.full_name
                html_url= $repo.html_url
                description= $repo.description
                stargazers_count= $repo.stargazers_count
                forks_count= $repo.forks_count
                partner= ""
                authorType="" 
                projectType= ""
                topics= $repo.topics
                isFeatured= $false
                version= "9.5"
                pushed_at = $repo.pushed_at
            }

            ##ADD REPOSITORY ITEM TO REPOSITORIES COLLECTION
            $repositoryModels.Add($repositoryItem)
        }
    }

    ##CONVERT REPOSITORIES COLLECTION TO JSON FORMAT
    $repositoryJSON = $repositoryModels | ConvertTo-Json 

    ##CREATE REPOSITORIES.JSON FILE LOCALLY
    $repositoryJSON | Out-File $local_json_file_location  
    
    ##LOAD JSON CONTENT INTO LOCAL VARIABLE
    $json_Content = get-content $local_json_file_location

    ##ENCODE JSON FILE TO BASE64 STRING
    ##THIS IS REQUIRED BY GITHUB DIRECTORIES API WHEN REPLACING A FILE VIA API
    $utf_content = [System.Text.Encoding]::UTF8.GetBytes($json_Content)
    $encoded_content = [System.Convert]::ToBase64String($utf_content)

    ##GITHUB DIRECTORIES API REQUIRES AUTH HEADER TO USE PUT METHOD
    ##SETUP AUTH HEADER WITH PERSONAL ACCESS TOKEN FROM GITHUB SETTINGS
    $header = @{"Authorization" = "token ######################"}

    ##SETTING THE GET API URL FOR GITHUB DIRECTORIES
    $content_uri = $githubUrl+'repos/'+$org+'/relativitydev/contents/data/repositories.json'

    ##GETTING THE REPOSITORIES.JSON FILE INFO FROM GITHUB IN ORDER TO PUT THE UPDATED CONTENT BACK LATER IN THE SCRIPT
    ##WE NEED TO GET THE SHA PROPERTY IN ORDER TO POPULATE THE MESSAGE FOR THE PUT CALL
    $response = Invoke-RestMethod $content_uri -Method Get -Headers $header

    ##CREATING THE PUT OBJECT FOR THE GITHUB DIRECTORIES API
    ##USING THE BASE64 ENCODED CONTENT STRING FROM THE LOCAL REPOSITORIES.JSON FILE
    ##USING THE SHA FROM THE GITHUB API DIRECTORIES GET CALL
    $putMessage = @{
        message='update repositories.json'
        committer=@{ 
            name="developer"
            email="developer@kcura.com"
            }
        content = $encoded_content
        sha= $response.sha
    }  

    ##CONVERTING THE PUT MESSAGE DATA TO JSON
    $put_json = $putMessage | ConvertTo-Json

    ##CALLING THE GITHUB API DIRECTORIES PUT METHOD TO REPLACE THE REPOSITORIES.JSON FILE ON GITHUB WITH THE LOCAL VERSION OF THE REPOSITORIES.JSON FILE
    $put_response = Invoke-RestMethod $content_uri-Method Put -Body $put_json -Headers $header

}


