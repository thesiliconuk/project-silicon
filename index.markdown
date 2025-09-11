---
title: The Silicon
---

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-1009V5P92C"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-1009V5P92C');
</script>

<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>

<meta charset="UTF-8">
<title>The Silicon</title>
<link rel="stylesheet" href="/styles/main.css"> 
<link rel="stylesheet" href="/styles/homescreen.css">
<link rel="stylesheet" href="/styles/articlelist.css">

<link rel="icon" type="image/x-icon" href="/images/logo.png">

<link href='https://fonts.googleapis.com/css?family=JetBrains Mono' rel='stylesheet'>
<link href="https://fonts.googleapis.com/css2?family=Kalam" rel="stylesheet">

<script src="/scripts/scrollreveal.js"></script>
<script src="https://kit.fontawesome.com/5ef0c294a5.js" crossorigin="anonymous"></script>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1331103242570956"
    crossorigin="anonymous"></script>
<script>
    window.addEventListener('load', function() {
        window.scrollTo(0, 0);
    });
</script>

<header class="navbar">
    <a href="/" class="navbar-link">
        <i class="fas fa-home"></i>
        <span class="navbar-text">Home</span>
    </a>
    <a href="/wallpapers" class="navbar-link">
        <i class="fas fa-image"></i>
        <span class="navbar-text">Wallpapers</span>
    </a>
    <a href="https://www.youtube.com/@the-silicon" class="navbar-link">
        <i class="fab fa-youtube"></i>
        <span class="navbar-text">Social Media</span>
    </a>
    <a href="/about" class="navbar-link">
        <i class="fas fa-info-circle"></i>
        <span class="navbar-text">About us</span>
    </a>
    <a href="/signup" id="signup" class="special-navbar-link">
        <i class="fas fa-user-plus"></i>
        <span class="navbar-text">Sign up</span>
    </a>
    <a href="/login" id="login" class="special-navbar-link">
        <i class="fas fa-sign-in-alt"></i>
        <span class="navbar-text">Log in</span>
    </a>
    <a href="/account" id="account" class="special-navbar-link">
        <i class="fas fa-user"></i>
        <span class="navbar-text">Account</span>
    </a>
    <a href="/logout" id="logout" class="special-navbar-link">
        <i class="fas fa-sign-out-alt"></i>
        <span class="navbar-text">Log out</span>
    </a>
</header>

<div class="home">
    <img class="home-logo" src="/images/logo.png">
    <h1 class="home-heading">The Silicon</h1>
    <div class="home-orb1"></div>
    <div class="home-orb2"></div>
    <p class="home-subtext">All the latest tech news <br> brought to you</p>
    <h2 class="home-callout">For absolutely free!</h2>
</div>

<h1 class="articlelist-policy">By using this website, you agree to our <a href="/legal/privacy">Privacy Policy</a> and <a href="/legal/cookies">use of Cookies</a>.</h1>

<div class="articlelist-container">
  {% assign sorted_articles = site.articles | sort: "date" | reverse %}
  {% for article in sorted_articles %}
    <div class="articlelist">
      <a href="{{ article.url }}">
        <h2 style="color: rgb(105,164,237)">{{ article.title }}</h2>
        <p><i>Published {{ article.date | date: "%B %d, %Y" }} | Written by {{ article.author }}</i></p>
        {% if article.banner %}
          <img src="{{ article.banner }}" width="80%">
        {% endif %}
      </a>
    </div>
  {% endfor %}
</div>

<p style="text-align: center; color: #89BEFF;"><a href="/legal/privacy" style="color: #89BEFF;">Privacy</a> <a href="/legal/cookies" style="color: #89BEFF;">Cookies</a></p>


<script src="/scripts/linkeEligibility.js" type="module"></script>

<script>
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on('init', user => {
      if (!user) {
        window.netlifyIdentity.on('login', () => {
          document.location.href = '/admin/';
        });
      }
    });
  }
</script>
