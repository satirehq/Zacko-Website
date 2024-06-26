# Zacko-Eleventy
 Source code of my website using Eleventy

To update the entire directory:
npx @11ty/eleventy --serve

To add a new image to the gallery:
    <li class="filter paintings"><a href="#" data-fancybox="images"><img src="#" alt="#">
      <div class="caption">
        <h3>TITLE (YEAR)</h3> <h4>Media</h4> <!-- <h3> = "Title" | <h4> = "Media used" -->
        <!-- Description -->
        <p></p>
      </div></a>
    </li>

<!-- What each container means via its letter: -->
  <div class="M">Main content</div>
  <div class="L">left Sidebar</div>
  <div class="R">Right Sidebar</div>

<!-- Date format: -->
"year-month-day"