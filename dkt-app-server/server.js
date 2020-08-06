
const express = require('express');
const storage = require('node-persist');
const bodyParser = require('body-parser');
const cors = require('cors');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid')

// this is only used i  the first run
const questions = require('./Quetions.json');




(async () => {
    await storage.init({ dir: './data' });
})();


(async () => {

    const server = express();
    server.use(cors());
    server.use(express.json());
    server.use(bodyParser.json());

    server.get('/questions', async (req, res) => {
        res.json(questions);
    });

    let checkCustomerAnswer = (options) => {
        let correctAnswerCount = 0;
        for (let option of options) {
            let question = questions.find(q => q.id == option.questionId);

            if (question.correctAnswer == option.option) {
                correctAnswerCount++;
            }
        }
        if (correctAnswerCount >= 4) {
            return true;
        } else {
            return false;
        }
    }

    server.post("/submitResult", async (req, res) => {
        //search in the storage using 
        console.log(req.body);
        let value = await storage.getItem(req.body.customername);
        if (value == undefined) {
            storage.setItem(req.body.customername, req.body.options);

            let customerSuccessed = checkCustomerAnswer(req.body.options);

            if (customerSuccessed == true)
              {
                res.send({ result: "Congratulations You passed", success: true });
            }
            else {
                res.json({ result: "Sorry, You have to get a secound round" });
            }
        }else {
            let customerSuccessed = checkCustomerAnswer(value);

            if (customerSuccessed == true) {
                res.send({ result: "You already in the system, Congratulations You passed" });
            }
            else {
                res.json({ result: "You already in the system, Sorry, you failed." });
            }
        }
    });


    server.listen(4000, () => {
        console.log('The server is listing on port 4000 http://localhost:');
    });
})();











