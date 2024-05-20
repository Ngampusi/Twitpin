document.addEventListener("DOMContentLoaded", function() {
  // Check if there are tweets in local storage
  let tweets = JSON.parse(localStorage.getItem("tweets")) || [];
  tweets.forEach(function(tweet) {
    addTweet(tweet.content, tweet.likes, tweet.comments);
  });

  // Add random tweet every 20 seconds
  setInterval(function() {
    addRandomTweet();
  }, 10000);

  document.getElementById("newTweetBtn").addEventListener("click", function() {
    document.getElementById("modal").style.display = "block";
  });

  document.getElementById("tweetBtn").addEventListener("click", function() {
    let tweetContent = document.getElementById("tweetInput").value;
    if (tweetContent.trim() !== "") {
      let tweet = {
        content: tweetContent,
        likes: 0,
        comments: []
      };
      tweets.push(tweet);
      addTweet(tweetContent, 0, []);
      saveTweets(); // Menyimpan tweet setelah ditambahkan
      document.getElementById("modal").style.display = "none";
      document.getElementById("tweetInput").value = "";
    }
  });

  document.getElementById("saveBtn").addEventListener("click", function() {
    saveTweets(); // Menyimpan tweet saat tombol "Save" ditekan
    alert("Tweets saved successfully!");
  });

  function addTweet(tweetContent, likes, comments) {
    let tweetContainer = document.getElementById("tweetContainer");
    let tweet = document.createElement("div");
    tweet.classList.add("tweet");
    tweet.innerHTML = `
      <p class="tweet-content">${tweetContent}</p>
      <div class="info">
        <span class="like-count">${likes} Likes</span> |
        <span class="comment-count">${comments.length} Comments</span>
        <button class="show-comments-btn">Show Comments</button>
      </div>
      <div class="comments" style="display: none;"></div>
      <div class="actions">
        <button class="like-btn">Like <span class="like-icon">&#10084;</span></button>
        <button class="comment-btn">Comment <span class="comment-icon">&#9993;</span></button>
      </div>
    `;
    tweetContainer.appendChild(tweet);

    tweet.querySelector(".like-btn").addEventListener("click", function() {
      likes++;
      updateLikeCount();
      saveTweets();
    });

    tweet.querySelector(".comment-btn").addEventListener("click", function() {
      let commentText = prompt("Enter your comment:");
      if (commentText) {
        comments.push({ name: "User", text: commentText });
        updateCommentCount();
        renderComments();
        saveTweets();
      }
    });

    tweet.querySelector(".show-comments-btn").addEventListener("click", function() {
      let commentsSection = tweet.querySelector(".comments");
      if (commentsSection.style.display === "none") {
        commentsSection.style.display = "block";
        this.innerText = "Hide Comments";
      } else {
        commentsSection.style.display = "none";
        this.innerText = "Show Comments";
      }
    });

    function updateLikeCount() {
      tweet.querySelector(".like-count").innerText = likes === 1 ? "1 Like" : `${likes} Likes`;
    }

    function updateCommentCount() {
      tweet.querySelector(".comment-count").innerText = comments.length === 1 ? "1 Comment" : `${comments.length} Comments`;
    }

    function renderComments() {
      let commentsSection = tweet.querySelector(".comments");
      commentsSection.innerHTML = "";
      comments.forEach(function(comment) {
        let commentElement = document.createElement("div");
        commentElement.classList.add("comment");
        commentElement.innerHTML = `
          <p class="comment-text"><strong>${comment.name}:</strong> ${comment.text}</p>`;
        commentsSection.appendChild(commentElement);
      });
    }
  }

  function addRandomTweet() {
    let randomTweetContent = "This is a random tweet!";
    let randomLikes = Math.floor(Math.random() * 100);
    let randomComments = [];

    for (let i = 0; i < 30; i++) {
      let randomCommentText = generateRandomEnglishComment();
      let randomComment = {
        name: generateRandomBotName(),
        text: randomCommentText
      };
      randomComments.push(randomComment);
    }

    addTweet(randomTweetContent, randomLikes, randomComments);
    saveTweets();
  }

  function generateRandomEnglishComment() {
    let comments = [
      "Great post!",
      "I agree!",
      "Interesting thoughts!",
      "Well said!",
      "I appreciate your perspective!",
      "Keep up the good work!",
      "You're awesome!",
      "Fantastic!",
      "Love it!",
      "Brilliant!",
      "Insightful!",
      "Thank you for sharing!"
    ];
    return comments[Math.floor(Math.random() * comments.length)];
  }

  function generateRandomBotName() {
    let botNames = ["AlphaBot", "BetaBot", "GammaBot", "DeltaBot", "EpsilonBot"];
    return botNames[Math.floor(Math.random() * botNames.length)];
  }

  function saveTweets() {
    localStorage.setItem("tweets", JSON.stringify(tweets));
  }
});