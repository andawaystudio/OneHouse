// CMS Load

window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  "cmsload",
  (listInstances) => {
    listInstances[0].on("renderitems", (renderedItems) => {
      collectionListLinks();
    });

    listInstances[1].on("renderitems", (renderedItems) => {
      articleSwiper.destroy();
      articleSwiperInit();
    });
  }
]);

// Site Header

const siteHeader = $(".site-header");
const pageNav = $(".page-nav");
let lastScrollTop = $(window).scrollTop();

$(window).scroll(function () {
  const newScrollTop = $(this).scrollTop();
  const scrollingDown = newScrollTop > lastScrollTop;

  if (newScrollTop > 0 && scrollingDown) {
    siteHeader.addClass("cc-hide");
  } else {
    siteHeader.removeClass("cc-hide");
  }

  if (pageNav.length) {
    let navOffset = pageNav.offset().top - siteHeader.height();

    if (newScrollTop > 0 && scrollingDown && newScrollTop >= navOffset) {
      pageNav.removeClass("cc-show");
    } else {
      pageNav.addClass("cc-show");
    }
  }

  lastScrollTop = newScrollTop;
});

// Hero Swiper

const heroSwiper = new Swiper(".hero_list-wrapper", {
  pagination: {
    el: ".hero_pagination-wrapper",
    bulletClass: "hero_pagination-bullet",
    bulletActiveClass: "cc-active",
    renderBullet: function (index, className) {
      return (
        '<div class="' +
        className +
        '"><div class="hero_pagination-fill"></div></div>'
      );
    }
  },
  navigation: {
    nextEl: ".hero_arrow.cc-next",
    prevEl: ".hero_arrow.cc-prev"
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  effect: "fade",
  speed: 1000,
  loop: true
});

heroSwiper.on("slideChange", function () {
  const slideCount = `${this.realIndex + 1} / ${this.slides.length}`;
  $(".hero_count").text(slideCount);
});

// Article Swiper

let articleSwiper;
const articleSwiperConfig = {
  pagination: {
    el: ".article-swiper_pagination",
    bulletClass: "article-swiper_pagination-bullet",
    bulletActiveClass: "cc-active",
    renderBullet: function (index, className) {
      return '<div class="' + className + '"></div>';
    }
  },
  navigation: {
    nextEl: ".article-swiper_next",
    prevEl: ".article-swiper_prev"
  },
  mousewheel: {
    forceToAxis: true
  },
  effect: "fade",
  speed: 500,
  loop: true
};

function articleSwiperInit() {
  articleSwiper = new Swiper(
    ".article-swiper_list-wrapper",
    articleSwiperConfig
  );
}

articleSwiperInit();

// Filters

$(".filter").on("click", function () {
  $(this).closest(".filters_list").find(".filter").removeClass("cc-active");
  $(this).addClass("cc-active");
});

// Modal

$(".ajax-modal_close").on("click", function () {
  $("body").removeClass("no-scroll");
  setTimeout(() => $(".ajax-modal_body").scrollTop(0), 400);
});

function openModal(item) {
  $.get($(item).attr("href"))
    .done(function (data) {
      $(".ajax-modal_body").html($(data).find(".modal-wrapper").html());
      articleEmptyState();
      projectSwiperInit();
      $("body").addClass("no-scroll");
      $(".ajax-modal_open").click();
    })
    .fail(function () {
      console.error("Failed to load modal content.");
    });
}

// Collection List Links
function collectionListLinks() {
  $(".collection-list_link").on("click", function (e) {
    e.preventDefault();
    openModal(this);
  });
}

collectionListLinks();

// Article Empty State

function articleEmptyState() {
  const count = $(".related-articles_list-item").length;
  const lastItem = $(".related-articles_list-item").last();

  if (count === 0) $(".section-related").hide();
  else if (count < 3) $(".static-link").insertAfter(lastItem);
}

// Project Swiper

let projectSwiper;

const projectSwiperConfig = {
  pagination: {
    el: ".project_swiper_pagination",
    bulletClass: "project_swiper_pagination_bullet",
    bulletActiveClass: "cc-active",
    renderBullet: function (index, className) {
      return '<div class="' + className + '"></div>';
    }
  },
  navigation: {
    nextEl: ".project_swiper_next",
    prevEl: ".project_swiper_prev"
  },
  mousewheel: {
    forceToAxis: true
  },
  effect: "fade",
  speed: 500,
  loop: true
};

function projectSwiperInit() {
  projectSwiper = new Swiper(
    ".project_swiper_list-wrapper",
    projectSwiperConfig
  );
}

projectSwiperInit();
