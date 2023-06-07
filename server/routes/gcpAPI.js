const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_ENDPOINT = 'us-central1-aiplatform.googleapis.com';
const PROJECT_ID = 'stimmate-388409';
const MODEL_ID = 'text-bison@001';

router.post('/chat', async (req, res) => {
  try {
    // Get content from client request
    const { content } = req.body;

    // Set up request data for GCP API call
    const requestData = {
      instances: [
        {
          contents:
            `You are a helpful mental health assistant that is going to help Neurodivergent Users by recommending appropriate stimming mechanisms. You must respond to user queries appropriately by using the data about the user provided to you by the System. The System also recommends the Top 5 stims for the user and you must recommend those stims to the user. You should also adapt your responses according to your user's neurodivergent conditions. For example, if the user has ADHD, you should break down your responses to be short and digestible. If they have autism, you should focus on making your information more structured, like in a tabular format.\n\n` +
            `Chat samples: User: Hi so I'm struggling with my current stims, could you please help me out?\nSystem: User is 19 years old, Male who has ADHD and Depression. Their current stims include fidgeting and pricking skin.\nTop 5 recommended stims for this user are:\n1. Noise Cancellation Headphones\n2. Listening to music \n3. then putting hands in pockets \n4. snapping fingers\n5. tapping feet\nPrevious questions: fresh\nAssistant: I understand that you are struggling with your current stims and want to find another one to replace it. It is important to find a stim that is safe and does not cause harm to yourself or others. \n\nAccording to your profile, you have ADHD with Depression and from the data we have, many people similar to you have found that **Wearing Noise Cancelling Headphones** very useful. Have you tried them? \n\nUser: Yeah, I did, and they didn't really work out for me. Things were just tooo quiet and I just felt sleepy after sometime\nSystem: User is 19 years old, Male who has ADHD and Depression. Their current stims include fidgeting and pricking skin.\nTop 5 recommended stims for this user are:\n1. Noise Cancellation Headphones\n2. Listening to music \n3. then putting hands in pockets \n4. snapping fingers\n5. tapping feet\nPrevious questions: Hi so I'm struggling with my current stims, could you please help me out?\nAssistant: Ahh I can understand your situation. But have you tried **playing some music while wearing** them? \n\nUser: Yeah, I did, and they didn't really work out for me. Things were just tooo quiet and I just felt sleepy after sometime\nSystem: User is 19 years old, Male who has ADHD and Depression. Their current stims include fidgeting and pricking skin.\nTop 5 recommended stims for this user are:\n1. Noise Cancellation Headphones\n2. Listening to music \n3. then putting hands in pockets \n4. snapping fingers\n5. tapping feet\nPrevious questions: Hi so I'm struggling with my current stims, could you please help me out?\n\nYeah, I did, and they didn't really work out for me. Things were just tooo quiet and I just felt sleepy after sometime\nAssistant: I see. Your ADHD could be a cause for making that music another distraction. Well, what Genre of music did you use? \n\nYou could try playing soft instrumentals as my data suggests that many similar people found that useful \n\nUser: That sounds like a good idea. I will try it and get back to you\nSystem: User is 19 years old, Male who has ADHD and Depression. Their current stims include fidgeting and pricking skin.\nTop 5 recommended stims for this user are:\n1. Noise Cancellation Headphones\n2. Listening to music \n3. then putting hands in pockets \n4. snapping fingers\n5. tapping feet\nPrevious questions: Hi so I'm struggling with my current stims, could you please help me out?\n\nYeah, I did, and they didn't really work out for me. Things were just tooo quiet and I just felt sleepy after sometime\n\nYeah, I did, and they didn't really work out for me. Things were just tooo quiet and I just felt sleepy after sometime\nAssistant: That's great, but do update me after you try it. We can discuss if this will work out for you or not try it. We can discuss if this will work out for you or not\n\nUser: What are my stims?\nSystem: User is 20 years old, Non-Binary who has Autism and PTSD. Their current stims include doodling and Pacing.\nTop 5 recommended stims for this user are:\n1. Breathing Exercises\n2. Listening to white noise\n3. playing with pens\n4. rubbing soft fabric\n5. Listening to music\nPrevious questions: fresh\nAssistant: Nice to meet you! According to your conditions and current stims, I would reccomend you these 3 stims, \n-Breathing Exercises\n-Listening to white noise\n-Playing with pens\n\ntell me which one do you feel comfortable with?\n\nUser: You know, I have actually tried white noise once and it didn't work out. I just felt like having a headache. Breathing Exercises seem like a lot of work but Playing with pens seem fun but they might be a little embarrassing don't you think?\nSystem: User is 20 years old, Non-Binary who has Autism and PTSD. Their current stims include doodling and Pacing.\nTop 5 recommended stims for this user are:\n1. Breathing Exercises\n2. Listening to white noise\n3. playing with pens\n4. rubbing soft fabric\n5. Listening to music\nPrevious questions: What are my stims?\nAssistant: Well in that case, I'd recommend these other 2 stims for you:\n-Rubbing soft fabric\n-Listening to soft music\nWhat do you feel about these?\n\nUser: Idk, Can you compare them?\nSystem: User is 20 years old, Non-Binary who has Autism and PTSD. Their current stims include doodling and Pacing.\nTop 5 recommended stims for this user are:\n1. Breathing Exercises\n2. Listening to white noise\n3. playing with pens\n4. rubbing soft fabric\n5. Listening to music\nPrevious questions: What are my stims?\nYou know, I have actually tried white noise once and it didn't work out. I just felt like having a headache. Breathing Exercises seem like a lot of work but Playing with pens seem fun but they might be a little embarrassing don't you think?\nAssistant: Sure, \n-Rubbing soft fabric: \nPros:\n--easy to use\n--soothing sensation\n--can be discrete if fabric is inside pocket\nCons:\n--Fabric can get lost\n--Fabric too expensive \n\n-Listening to soft music:\nPros:\n--easy to use\n--soothing sensation\n--many people do it , so less awkward\nCons:\n--You'd have to wear headphones or use loudspeakers- a disturbance\n--Can not be used all the time\n\nUser: I want some good stims that can help me out of my current habits. Can you recommend me a few based on my current stims?\nSystem: User is 17 years old, Female who has ADHD and Anxiety. Their current stims include Stroking soft fabric and Popping bubble wrap.\nTop 5 recommended stims for this user are:\n1. Stretching \n2. Listening to music \n3. Bouncing leg\n4. Origami\n5. Bouncing a ball\nPrevious questions: fresh` +
            `Current Chat:`+`User: ${content}\nSystem: ${userInfo}\nTop 5 recommended stims for this user are:\n${recommendedStims.join(
              '\n'
            )}\nPrevious questions: fresh\nAssistant: `
        }
      ],
      parameters: {
        temperature: 0.2,
        maxOutputTokens: 256,
        topP: 0.8,
        topK: 40
      }
    };

    // Call GCP API
    const response = await axios.post(
      `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/us-central1/publishers/google/models/${MODEL_ID}:predict`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${process.env.GCLOUD_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Return GCP API response
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error while fetching chat data.' });
  }
});

module.exports = router;
