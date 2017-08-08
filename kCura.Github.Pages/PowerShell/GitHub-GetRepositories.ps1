$local_json_file_location = 'C:\DEV\repository-list\repositories.json'
$githubUrl = 'https://api.github.com/'
$org = 'kcura-relativity'
$client_id ='##############'
$client_secret = '########################'

$rate_limit_uri = $githubUrl+'rate_limit?client_id='+$client_id+'&client_secret='+$client_secret
$rate_limit = Invoke-RestMethod -Uri $rate_limit_uri

if ($rate_limit -and $rate_limit.rate -and $rate_limit.rate.remaining -gt 0){
    
    $uri = $githubUrl+'orgs/'+$org+'/repos?client_id='+$client_id+'&client_secret='+$client_secret
    $repositories = Invoke-RestMethod -Uri $uri 

    $repositoryModels = New-Object System.Collections.Generic.List[System.Object]
    foreach($repo in $repositories) {
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
        }
        $repositoryMOdels.Add($repositoryItem)
    }
    $repositoryJSON = $repositoryModels | ConvertTo-Json 

    $repositoryJSON | Out-File $local_json_file_location  
    
    $json_Content = get-content $local_json_file_location

    $utf_content = [System.Text.Encoding]::UTF8.GetBytes($json_Content)

    $encoded_content = [System.Convert]::ToBase64String($utf_content)

    $header = @{"Authorization" = "token ######################"}

    $content_uri = $githubUrl+'repos/'+$org+'/relativity-dev/contents/data/repositories.json'

    $response = Invoke-RestMethod $content_uri -Method Get -Headers $header

    $putMessage = @{
        message='update repositories.json'
        committer=@{ 
            name="dev user"
            email="devuser@email.com"
            }
        content = $encoded_content
        sha= $response.sha
    }  

    $put_json = $putMessage | ConvertTo-Json


    $put_response = Invoke-RestMethod $content_uri-Method Put -Body $put_json -Headers $header

}


