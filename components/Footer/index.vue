<template>
  <div class="footer-page">
    <footer class="footer">
      <div class="footer-container">
        <!-- Brand Section -->
        <div class="footer-about">
          <div class="logo flex items-center">
            <NuxtLink to="/">
              <img
                src="/images/rumdulLogo.png"
                alt="Logo"
                class="h-20 w-auto"
              />
            </NuxtLink>
          </div>
          <p>
            We offer the best products with excellent service and fast delivery.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        <!-- Contact Information -->
        <div class="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: support@yourstore.com</p>
          <p>Phone: +123 456 7890</p>
          <div class="footer-social">
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Twitter">TW</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 Rumdul All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'FooterPage',
}
</script>

<style scoped>
.footer {
  background-color: #222;
  color: #fff;
  padding: 20px 40px;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.footer-about,
.footer-links,
.footer-contact {
  margin-bottom: 20px;
}

.footer-logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.footer-links ul {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin: 5px 0;
}

.footer-links a {
  color: #fff;
  text-decoration: none;
}

.footer-contact .footer-social a {
  margin-right: 10px;
  text-decoration: none;
  color: #fff;
}

.footer-bottom {
  text-align: center;
  margin-top: 20px;
  font-size: 0.9rem;
  border-top: 1px solid #444;
  padding-top: 10px;
}
</style>
