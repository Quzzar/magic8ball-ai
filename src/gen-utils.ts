import { AI_FUNCTION_URL } from "./data";
import { Sentiment } from ".";


export function getSentiment() : Sentiment {
  const result = Math.floor(Math.random() * 6) + 1;
  if(result === 1) {
    return 'GREAT';
  } else if(result === 2 || result === 3) {
    return 'GOOD';
  } else if(result === 4 || result === 5) {
    return 'BAD';
  } else {
    return 'MYSTERY';
  }
}

export function getPrompt(sentiment: Sentiment, question: string) {

  let options = '';
  if(sentiment === 'GREAT') {
    options = `
      1 - It is certain
      2 - It is decidedly so
      3 - Without a doubt
      4 - Yes definitely
      5 - You may rely on it
    `;
  }
  if(sentiment === 'GOOD') {
    options = `
      1 - As I see it, yes
      2 - Most likely
      3 - Outlook good
      4 - Yes
      5 - Signs point to yes
    `;
  }
  if(sentiment === 'BAD') {
    options = `
      1 - Don't count on it
      2 - My reply is no
      3 - My sources say no
      4 - Outlook not so good
      5 - Very doubtful
    `;
  }
  if(sentiment === 'MYSTERY') {
    options = `
      1 - Reply hazy, try again
      2 - Ask again later
      3 - Better not tell you now
      4 - Cannot predict now
      5 - Concentrate and ask again
    `;
  }

  return `
    You are a powerful fortune teller able to give insightful feedback on people's life questions. The following is a question from someone coming to you for advice:

    ${question}
  
    You can only respond with the number corresponding to the following answers:
    ${options}
  `
}

export async function getAICompletion(content: string) {
  const res = await fetch(AI_FUNCTION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: content,
      //model: "gpt-4",
    }),
  });
  return res.ok
    ? await res.text()
    : "Too many requests, please try again later.";
}


export function getAnswer(answerNum: number, sentiment: Sentiment){

  if(sentiment === 'GREAT'){
    if(answerNum === 1) return "It is certain";
    if(answerNum === 2) return "It is decidedly so";
    if(answerNum === 3) return "Without a doubt";
    if(answerNum === 4) return "Yes definitely";
    if(answerNum === 5) return "You may rely on it";
  }
  if(sentiment === 'GOOD'){
    if(answerNum === 1) return "As I see it, yes";
    if(answerNum === 2) return "Most likely";
    if(answerNum === 3) return "Outlook good";
    if(answerNum === 4) return "Yes";
    if(answerNum === 5) return "Signs point to yes";
  }
  if(sentiment === 'BAD'){
    if(answerNum === 1) return "Don't count on it";
    if(answerNum === 2) return "My reply is no";
    if(answerNum === 3) return "My sources say no";
    if(answerNum === 4) return "Outlook not so good";
    if(answerNum === 5) return "Very doubtful";
  }
  if(sentiment === 'MYSTERY'){
    if(answerNum === 1) return "Reply hazy, try again";
    if(answerNum === 2) return "Ask again later";
    if(answerNum === 3) return "Better not tell you now";
    if(answerNum === 4) return "Cannot predict now";
    if(answerNum === 5) return "Concentrate and ask again";
  }
  return "Reply hazy, try again";

}

export async function askQuestion(question: string){

  const sentiment = getSentiment();
  const prompt = getPrompt(sentiment, question);
  const response = await getAICompletion(prompt);

  return getAnswer(parseInt(response), sentiment);

}

export function waitDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}