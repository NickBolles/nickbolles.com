Set GOPATH to this directory, restart terminals

install tools
```
https://ds7bpvpyd2.execute-api.us-west-2.amazonaws.com/prod/emailme
```
install dependancies
```
go get github.com/aws/aws-lambda-go/events
go get github.com/aws/aws-lambda-go/lambda
go get github.com/aws/aws-sdk-go/aws
go get github.com/aws/aws-sdk-go/aws/session
go get github.com/aws/aws-sdk-go/service/ses

```

setup build env (for powershell)

```
$env:GOOS = "linux"
$env:GOARCH = "amd64"
```


Run 

```
cd src
go build -o main main.go
..\bin\build-lambda-zip.exe -o main.zip main
```

Upload zip to AWS Lambda


current endpoint: 
`https://ds7bpvpyd2.execute-api.us-west-2.amazonaws.com/prod/emailme`

