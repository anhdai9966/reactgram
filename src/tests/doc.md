username
https://www.instagram.com/api/v1/users/web_profile_info/?username=sontungmtp
// feet cua user
https://www.instagram.com/api/v1/feed/user/sontungmtp/username/?count=12
recent
https://www.instagram.com/api/v1/web/search/recent_searches/

// Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode == 'auth/email-already-in-use')
      {
            alert('email-already-in-use.');
        }
        else
        {
            alert(errorMessage);
        }
          console.log(error);

    });