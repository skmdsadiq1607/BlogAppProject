import React from 'react'

function Footer() {
  return (
    <div>
      <footer class="blog-footer">
    <div class="footer-container">
        <!-- Brand Info -->
        <div class="footer-section about">
            <h3>MyBlog</h3>
            <p>Sharing insights on technology and design every week.</p>
        </div>

        <!-- Quick Links -->
        <div class="footer-section links">
            <h4>Quick Links</h4>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
        </div>

        <!-- Social Media -->
        <div class="footer-section social">
            <h4>Follow Us</h4>
            <div class="social-icons">
                <a href="#">Twitter</a>
                <a href="#">GitHub</a>
                <a href="#">LinkedIn</a>
            </div>
        </div>
    </div>
    
    <!-- Copyright -->
    <div class="footer-bottom">
        <p>&copy; 2026 MyBlog. All rights reserved.</p>
    </div>
</footer>

    </div>
  )
}

export default Footer
