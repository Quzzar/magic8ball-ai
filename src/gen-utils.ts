import { AI_FUNCTION_URL } from "./data";


export async function getAICompletion(content: string, model = "gpt-4") {
  const res = await fetch(AI_FUNCTION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: content,
      model: model,
    }),
  });
  return res.ok
    ? await res.text()
    : "Too many requests, please try again later.";
}


export function getAnswer(answerNum: number){

  if(answerNum === 1){ return "It is certain"; }
  if(answerNum === 2){ return "It is decidedly so"; }
  if(answerNum === 3){ return "Without a doubt"; }
  if(answerNum === 4){ return "Yes definitely"; }
  if(answerNum === 5){ return "You may rely on it"; }
  if(answerNum === 6){ return "As I see it, yes"; }
  if(answerNum === 7){ return "Most likely"; }
  if(answerNum === 8){ return "Outlook good"; }
  if(answerNum === 9){ return "Yes"; }
  if(answerNum === 10){ return "Signs point to yes"; }
  if(answerNum === 11){ return "Don't count on it"; }
  if(answerNum === 12){ return "My reply is no"; }
  if(answerNum === 13){ return "My sources say no"; }
  if(answerNum === 14){ return "Outlook not so good"; }
  if(answerNum === 15){ return "Very doubtful"; }

  const mysteryNum = Math.floor(Math.random() * 5) + 1;
  if(mysteryNum === 1){ return "Reply hazy, try again"; }
  if(mysteryNum === 2){ return "Ask again later"; }
  if(mysteryNum === 3){ return "Better not tell you now"; }
  if(mysteryNum === 4){ return "Cannot predict now"; }
  if(mysteryNum === 5){ return "Concentrate and ask again"; }
  return "Reply hazy, try again.";

}


export function getStoryTheme() {
  const themes = [
    'Forboding',
    'Adventure',
    'Comedy',
    'Romance',
    'Horror',
    'Drama',
    'Fantasy',
    'Thriller',
    'Crime',
    'Action',
    'Political',
    'Musical',
    'Satire',
    'Parody',
    'Slapstick',
    'Surreal',
    'Tragedy',
    'Coming of Age',
    'Family',
    'Slice of Life',
    'Sports',
    'Erotic',
    'Death',
    'Friendship',
    'Regret',
    'Hope',
    'Time',
    'Respect',
    'Responsibility',
    'Money',
    'Loneliness',
    'Jealousy',
    'Hard work',
    'Gossip',
    'Being yourself',
    'Acceptance',
    'Forgiveness',
    'Courage',
    'Revenge',
    'Hate',
    'Love',
  ];
  // Select a random theme
  return themes[Math.floor(Math.random() * themes.length)];
}


export async function askQuestion(question: string){

  const story = await getAICompletion(`
    ## Use the following information to write a short play script with 3 scenes. The theme of the play is ${getStoryTheme()}.

    ${question}
  `, "gpt-3.5-turbo");

  const response = await getAICompletion(`
    ## Using the following question and story, choose the best number option which summaries what happened.

    ### Question:
    ${question}

    ### Story:
    ${story}

    ### You can only respond with the number corresponding to the following answers:
    1 - It is certain
    2 - It is decidedly so
    3 - Without a doubt
    4 - Yes definitely
    5 - You may rely on it
    6 - As I see it, yes
    7 - Most likely
    8 - Outlook good
    9 - Yes
    10 - Signs point to yes
    11 - Don't count on it
    12 - My reply is no
    13 - My sources say no
    14 - Outlook not so good
    15 - Very doubtful
  `);

  return getAnswer(parseInt(response));

}

export function waitDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}