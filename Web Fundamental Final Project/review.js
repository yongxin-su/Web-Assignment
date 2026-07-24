
document.addEventListener("DOMContentLoaded", () => {
  const ratingContainer = document.querySelector(".rating");
  const starLabels = ratingContainer ? ratingContainer.querySelectorAll("label") : [];
  const starInputs = ratingContainer ? ratingContainer.querySelectorAll("input[type='radio']") : [];

  starInputs.forEach((input, index) => {
    const starId = `star-rating-${index + 1}`;
    input.id = starId;

    if (starLabels[index]) {
      starLabels[index].setAttribute("for", starId);
    }
  });

  const reviewData = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0
  };

  const userNameInput = document.getElementById("user-name");
  const userCommentInput = document.getElementById("user-comment");
  const submitBtn = document.querySelector(".submit-button");
  const commentList = document.getElementById("comment-list");

  if (submitBtn) {
    submitBtn.addEventListener("click", (event) => {
      event.preventDefault(); 

      const selectedRadio = document.querySelector(".rating input[type='radio']:checked");
      const nameValue = userNameInput ? userNameInput.value.trim() : "";
      const commentValue = userCommentInput ? userCommentInput.value.trim() : "";


      if (!selectedRadio) {
        alert("Please select a star rating!");
        return;
      }
      if (!nameValue || !commentValue) {    
            alert("Please fill in both your name and review comment!");
        return;
      }

      const selectedRating = parseInt(selectedRadio.value, 10);


      reviewData[selectedRating]++;

      updateReviewStats();

      addCommentToDOM(nameValue, selectedRating, commentValue);

      userNameInput.value = "";
      userCommentInput.value = "";
      selectedRadio.checked = false;
    });
  }

  function addCommentToDOM(author, rating, text) {
    if (!commentList) return;

    const commentBox = document.createElement("div");
    commentBox.className = "comment-box";

    const filledStars = "★".repeat(rating);
    const emptyStars = "☆".repeat(5 - rating);

    commentBox.innerHTML =`
      <div class="comment-header">
        <strong>${escapeHTML(author)}</strong>
        <span class="comment-stars">${filledStars}${emptyStars}</span>
      </div>
      <p class="comment-text">${escapeHTML(text)}</p>
     `;

    commentList.prepend(commentBox);
  }

  function updateReviewStats() {
    let totalReviews = 0;
    let weightedSum = 0;

    for (let rating = 1; rating <= 5; rating++) {
      const count = reviewData[rating];
      totalReviews += count;
      weightedSum += count * rating;
    }

    const averageScore = totalReviews > 0 ? (weightedSum / totalReviews).toFixed(1) : "0.0";

    const avgTextEl = document.querySelector(".avg-text");
    if (avgTextEl) {
      avgTextEl.textContent = averageScore;
    }

    for (let rating = 1; rating <= 5; rating++) {
      const count = reviewData[rating];
      const countEl = document.getElementById(`count-${rating}`);
      const progressBarEl = document.getElementById(`bar-${rating}`);

      if (countEl) {
        countEl.textContent = count;
      }

      if (progressBarEl) {
        const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
        progressBarEl.style.width = `${percentage}%`;
      }
    }
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }
});