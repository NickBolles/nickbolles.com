package main

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/ses"
)

var (
	EmailNotProvided   = errors.New("no email provided")
	MessageNotProvided = errors.New("no message provided")
)

const (
	Success = "success"
	Error   = "error"
)

type ClientMessage struct {
	Email   string `json:"email"`
	Name    string `json:"name"`
	Message string `json:"message"`
}

type ResponseMessage struct {
	Type    string `json:"type"`
	Message string `json:"message"`
}

var toEmail string
var subject string
var emailClient *ses.SES

func init() {
	toEmail = os.Getenv("TO_EMAIL")
	subject = os.Getenv("SUBJECT")

	if len(subject) < 0 {
		subject = "Message from website"
	}

	emailClient = ses.New(session.New(), aws.NewConfig().WithRegion("us-west-2"))
}

func ReturnErrorToUser(error error, status int) (events.APIGatewayProxyResponse, error) {
	errorMessage, _ := json.Marshal(ResponseMessage{
		Type:    Error,
		Message: error.Error(),
	})

	log.Println(error.Error())

	return events.APIGatewayProxyResponse{
		Headers: map[string]string{
			"Content-Type":                "application/json",
			"Access-Control-Allow-Origin": "*",
		},
		StatusCode: status,
		Body:       string(errorMessage),
	}, nil
}

func Handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {

	body := request.Body

	var message ClientMessage
	err := json.Unmarshal([]byte(body), &message)

	if err != nil {
		return ReturnErrorToUser(err, http.StatusInternalServerError)
	} else if len(message.Email) < 1 {
		return ReturnErrorToUser(EmailNotProvided, http.StatusBadRequest)
	} else if len(message.Message) < 1 {
		return ReturnErrorToUser(MessageNotProvided, http.StatusBadRequest)
	}

	emailParams := &ses.SendEmailInput{
		Message: &ses.Message{
			Body: &ses.Body{
				Text: &ses.Content{
					Data: aws.String(message.Message + "\n From: " + message.Name + " - " + message.Email),
				},
			},
			Subject: &ses.Content{
				Data: aws.String(subject),
			},
		},
		Destination: &ses.Destination{
			ToAddresses: []*string{aws.String(toEmail)},
		},
		Source: aws.String(toEmail),
	}

	_, err = emailClient.SendEmail(emailParams)

	if err != nil {
		return ReturnErrorToUser(err, http.StatusInternalServerError)
	}

	successResponse, err := json.Marshal(ResponseMessage{Success, "Message is sent"})
	return events.APIGatewayProxyResponse{
		Headers: map[string]string{
			"Content-Type":                "application/json",
			"Access-Control-Allow-Origin": "*",
		},
		Body:       string(successResponse),
		StatusCode: 200,
	}, nil

}

func main() {
	lambda.Start(Handler)
}
