const Openai= require("openai");
require("dotenv").config();

const apiKey = process.env.API_KEY;

const configuration = new Openai({
  apiKey: apiKey,
});

async function main() {
    try {
      const completion = configuration.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "Who won the world series in 2020?" },
          { role: "assistant", content: "The Los Angeles Dodgers won the World Series in 2020." },
          { role: "user", content: "Where was it played?" }
        ],
      });
  
      console.log(completion.choices[0].message.content);
    } catch (error) {
      console.error("Error creating completion:", error);
    }
  }
  
  main();

// async function testAPI() {
//   try {
//     const response = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: "Hello!" }],
//     });
//     console.log(response.data.choices[0].message.content);
//   } catch (error) {
//     console.error("Error creating completion:", error);
//   }
// }

// testAPI();
