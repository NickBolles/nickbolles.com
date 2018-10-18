Set GOPATH to this directory, restart terminals

install tools

```
go get -u github.com/aws/aws-lambda-go/cmd/build-lambda-zip
```

install dependancies

```
go get github.com/aws/aws-lambda-go/events
go get github.com/aws/aws-lambda-go/lambda
go get github.com/aws/aws-sdk-go/aws
go get github.com/aws/aws-sdk-go/aws/session
go get github.com/aws/aws-sdk-go/service/ses
```

or with docker:

```
docker run
--rm -v C:\newsync\Development\nickbolles.com\www_nickbolles_com/lambda/:/usr/src/myapp -w /usr/src/myapp/src -e GOOS=linux -e GOARCH=amd64 golang:1.8 go get github.com/aws/aws-lambda-go/events github.com/aws/aws-lambda-go/lambda github.com/aws/aws-sdk-go/aws github.com/aws/aws-sdk-go/aws/session github.com/aws/aws-sdk-go/service/ses
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

or build with docker

Upload zip to AWS Lambda

current endpoint:
`https://ds7bpvpyd2.execute-api.us-west-2.amazonaws.com/prod/emailme`
