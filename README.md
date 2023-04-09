# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I'm proud of](#What-I'm-proud-of)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments

### Screenshot

![Design preview for the Interactive comments section coding challenge](./design/desktop-preview.jpg)

### Links

- Solution URL: [https://github.com/eivindsimonsen/messaging-app](https://github.com/eivindsimonsen/messaging-app)
- Live Site URL: [https://sparkly-kangaroo-72c67b.netlify.app/](https://sparkly-kangaroo-72c67b.netlify.app/)

## My process

### Built with

- SASS
- Typescript
- [React](https://reactjs.org/) - JS library
- [Firebase](https://firebase.google.com/) - Cloud database

### What I'm proud of

I am primarly a frontend dev, so pulling off these backend functions felt good. Firebase docs was great help.

```jsx
// Read comments
useEffect(() => {
  const q = query(collection(db, "messages"), orderBy("likes", "desc"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let messagesArr: any = [];
    querySnapshot.forEach((doc) => {
      messagesArr.push({ ...doc.data(), id: doc.id });
    });
    setMessages(messagesArr);
  });
  return () => unsubscribe();
}, []);

// Update comment
const updateComment = async (comment: any) => {
  await updateDoc(doc(db, "messages", comment.id), {
    message: comment.message,
  });
};

// Delete comment
const deleteComment = async (id: any) => {
  const confirmed = window.confirm("This will remove the comment, and all its replies. Do you wish to proceed?");

  if (confirmed) {
    await deleteDoc(doc(db, "messages", id));
  }
};

// Sign in
const handleGoogleSignIn = async () => {
  try {
    await googleSignIn();
  } catch (error) {
    console.log(error);
  }
};

// Sign Out
const handleSignOut = async () => {
  try {
    await logOut();
  } catch (error) {
    console.log(error);
  }
};
```

### Continued development

As of my understanding, firebase won't let users add specific IDs, add timestamps and other things. Because of this, the replies don't display publish time and have the ability to be replied.

```jsx
// Update
const createReply = async (e: any) => {
  e.preventDefault();
  toggleReply();

  await updateDoc(doc(db, "messages", captureId), {
    replies: arrayUnion({
      likes: 0,
      message: replyValue,
      profile_image: user.photoURL,
      username: user.displayName,
    }),
  });
};
```

### Useful resources

- [Firebase docs](https://firebase.google.com/docs) - This helped me with CRUD operations.
- [ChatGPT3](https://chat.openai.com/chat) - This is an amazing tool to help with debugging.

## Author

- Website - [https://www.easimonsen.com/](https://www.easimonsen.com/)
- LinkedIn - [@eivindSimonsen](https://www.linkedin.com/in/eivind-simonsen-9469121b9/)
