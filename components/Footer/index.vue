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
          <p class="mt-5">
            {{ $t('home.footer_description') }}
          </p>
        </div>

        <!-- Quick Links -->
        <div class="footer-links">
          <h3>{{ $t('home.quick_links') }}</h3>
          <ul>
            <li><a @click="navigateTo('')">{{ $t('home.about_us') }}</a></li>
            <li><a @click="navigateTo('')">{{ $t('home.store') }}</a></li>
            <li><a @click="navigateTo('')">{{ $t('home.faq') }}</a></li>
            <li><a @click="navigateTo('')">{{ $t('home.contact_us') }}</a></li>
          </ul>
        </div>

        <!-- Contact Information -->
        <div class="footer-contact">
          <h3>{{ $t('home.about_us') }}</h3>
          <p>{{ $t('home.email') }} : support@yourstore.com</p>
          <p>{{ $t('home.phone') }} : +123 456 7890</p>
          <div class="footer-social">
            <a aria-label="Facebook">FB</a>
            <a aria-label="Instagram">IG</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ $t('home.rights_reserved') }}</p>
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
