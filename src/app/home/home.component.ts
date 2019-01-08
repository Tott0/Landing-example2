import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { AppConstants } from '@app/app-constants';
import { getErrorMessage } from '@core/static-methods';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '@app/core/providers/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(100)
      ]),
      transition(':leave', [
        animate(100, style({ opacity: 0 }))
      ])
    ]),
    trigger('flipFrontBack', [
      state('true', style({
        transform: 'rotateY(0)'
      })),
      state('false', style({
        transform: 'rotateY(0)'
      })),
      transition('false <=> true', [
        style({
          transform: 'rotateY(180deg)'
        }),
        animate('350ms ease-out', keyframes([
          style({ transform: 'rotateY(180deg)', offset: 0 }),
          style({ transform: 'rotateY(90deg)', offset: 0.3 }),
          style({ transform: 'rotateY(0)', offset: 1 })
        ]))
      ]),
      transition('back => front', [
        animate('0ms')
      ])
    ]),
    trigger('slideLeftRight', [
      state('left', style({
        transform: 'translateX(-100%)'
      })),
      state('right', style({
        transform: 'translateX(100%)'
      })),
      state('normalFromLeft', style({
        transform: 'translateX(0)'
      })),
      state('normalFromRight', style({
        transform: 'translateX(0)'
      })),
      transition('* => left', [
        style({
          transform: 'translateX(0)'
        }),
        animate('600ms ease-in-out', style({
          transform: 'translateX(-100%)'
        }))
      ]),
      transition('* => right', [
        style({
          transform: 'translateX(0)'
        }),
        animate('600ms ease-in-out', style({
          transform: 'translateX(100%)'
        }))
      ]),
      transition('* => normalFromLeft', [
        style({
          transform: 'translateX(-100%)'
        }),
        animate('600ms ease-in-out', style({
          transform: 'translateX(0)'
        }))
      ]),
      transition('* => normalFromRight', [
        style({
          transform: 'translateX(100%)'
        }),
        animate('600ms ease-in-out', style({
          transform: 'translateX(0)'
        }))
      ]),
      transition('* => *', [animate('600ms ease-in-out')]),
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('solutionsSection', { read: ElementRef }) solutionsSection: ElementRef;
  @ViewChild('processSection', { read: ElementRef }) processSection: ElementRef;
  @ViewChild('newsSection', { read: ElementRef }) newsSection: ElementRef;

  carouselItems = [
    {
      id: 1,
      img: 'assets/images/warehouse2.jpg',
      title: 'EL ESPACIO QUE NECESITES <br> DONDE LO NECESITES',
      subtitle: 'Olvídate de las Cláusulas de Permanencia y Extensos Procesos de Contratación',
      animState: 'normal'
    },
    {
      id: 2,
      img: 'assets/images/warehouse3.jpg',
      title: 'LA PRIMERA RED DE BODEGAS <br> MÁS GRANDE DEL PAÍS',
      subtitle: 'Encuentra Espacios de Manera Rápida, Sencilla y Flexible en una Sola Plataforma',
    },
    {
      id: 3,
      img: 'assets/images/warehouse4.jpg',
      title: 'CONVIERTE TUS ESPACIOS IMPRODUCTIVOS <br> EN GANANCIAS EXTRAS',
      subtitle: 'Publica tu Espacio y te Conectamos con tus Próximos Clientes',
    }
  ];
  carouselIndex = 0;

  selectedService = 0;

  reviews = [
    {
      review: 'Vestibulum sed mauris quis arcu bibendum semper sed vitae erat.',
      author: 'Keelan Wade',
      authorPosition: 'Financial Services Professional',
      thumbnail: 'assets/images/review-thumb1.jpg',
      rating: 5.0
    },
    {
      review: 'Praesent dictum dolor a augue tempor, et congue nisi accumsan.',
      author: 'Elizabeth Mcgregor',
      authorPosition: 'Future Group Specialist',
      thumbnail: 'assets/images/review-thumb2.jpg',
      rating: 4.0
    },
    {
      review: 'Fusce nec pharetra quam, sit amet sagittis erat. Praesent Ut condimentum.',
      author: 'Dylan Castaneda',
      authorPosition: 'Product Response Facilitator',
      thumbnail: 'assets/images/review-thumb3.jpg',
      rating: 4.8
    },
    {
      review: 'Vestibulum tellus magna, malesuada non lacus facilisis, consectetur odio.',
      author: 'Esha Barnes',
      authorPosition: 'Internal Directives Specialist',
      thumbnail: 'assets/images/review-thumb4.jpg',
      rating: 4.6
    },
    {
      review: 'Sed congue magna vel libero blandit, nec mollis risus consectetur.',
      author: 'Zayn Wynn',
      authorPosition: 'Legacy Factors Manager',
      thumbnail: 'assets/images/review-thumb5.jpg',
      rating: 4.2
    },
    {
      review: 'Proin pellentesque dolor a facilisis vestibulum. Suspendisse vestibulum.',
      author: 'Lacie Forrest',
      authorPosition: 'Product Usability Agent',
      thumbnail: 'assets/images/review-thumb6.jpg',
      rating: 5.0
    }
  ];
  reviewIndex = 0;
  shownReviews = this.reviews.slice(0, 3);
  hideRevRight = false;
  hideRevLeft = false;

  latestPosts = [
    {
      url: 'blog-post-1',
      img: 'assets/images/blog-post-small-1.jpg',
      title: 'MAURIS TINCIDUNT EX EGET DICTUM.',
      text: 'incididunt ut labore et dolore magna aliqua. Ut enim aminim veniam, quis nostrud...',
    },
    {
      url: 'blog-post-2',
      img: 'assets/images/blog-post-small-2.jpg',
      title: 'MORBI PHARETRA, FELIS A FACILISIS.',
      text: 'incididunt ut labore et dolore magna aliqua. Ut enim aminim veniam, quis nostrud...',
    },
    {
      url: 'blog-post-3',
      img: 'assets/images/blog-post-small-3.jpg',
      title: 'CURABITUR FRINGILLA AC LOREM NEC.',
      text: 'incididunt ut labore et dolore magna aliqua. Ut enim aminim veniam, quis nostrud...',
    }
  ];

  carouselInterval;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
  ) { }

  ngOnInit() {
    AppConstants.isAtHome = true;

    this.sharedService.scrollToNews.subscribe(() => {
      window.scrollTo({
        top: this.newsSection.nativeElement.offsetTop - 50,
        behavior: 'smooth'
      });
    });

    this.sharedService.scrollToSolutions.subscribe(() => {
      window.scrollTo({
        top: this.solutionsSection.nativeElement.offsetTop - 50,
        behavior: 'smooth'
      });
    });

    this.sharedService.scrollToProcess.subscribe(() => {
      window.scrollTo({
        top: this.processSection.nativeElement.offsetTop - 50,
        behavior: 'smooth'
      });
    });

    this.resetCarouselInterval();
  }

  ngOnDestroy() {
    AppConstants.isAtHome = false;
    clearInterval(this.carouselInterval);
  }

  nextReviews() {
    this.hideRevLeft = false;

    this.reviewIndex++;
    const t = this.reviewIndex * 3;
    if (t >= this.reviews.length) {
      this.hideRevRight = true;
    }

    this.shownReviews = [];
    setTimeout(() => {
      this.shownReviews = this.reviews.slice(t, t + 3);
    }, 100);

    if ((this.reviewIndex + 1) * 3 >= this.reviews.length) {
      this.hideRevRight = true;
    }
  }
  prevReviews() {
    this.hideRevRight = false;

    this.reviewIndex--;
    const t = this.reviewIndex * 3;
    if (t < 0) {
      this.hideRevLeft = true;
      return;
    }

    this.shownReviews = [];
    setTimeout(() => {
      this.shownReviews = this.reviews.slice(t, t + 3);
    }, 100);

    if ((this.reviewIndex - 1) * 3 < 0) {
      this.hideRevLeft = true;
    }
  }

  triggerCarouselLeft() {
    const prevIndex = this.carouselIndex;
    if (--this.carouselIndex < 0) {
      this.carouselIndex = this.carouselItems.length - 1;
    }
    // console.group('group');

    // console.log('prev ' + prevIndex, this.carouselItems[prevIndex].animState);
    // console.log('sel ' + this.carouselIndex, this.carouselItems[this.carouselIndex].animState);

    this.carouselItems[prevIndex].animState = 'right';
    this.carouselItems[this.carouselIndex].animState = 'normalFromLeft';

    // console.log('prev ' + prevIndex, this.carouselItems[prevIndex].animState);
    // console.log('sel ' + this.carouselIndex, this.carouselItems[this.carouselIndex].animState);
    // console.groupEnd();

    this.resetCarouselInterval();
  }
  triggerCarouselRight() {
    const prevIndex = this.carouselIndex;
    if (++this.carouselIndex >= this.carouselItems.length) {
      this.carouselIndex = 0;
    }
    // console.group('group');

    // console.log('prev ' + prevIndex, this.carouselItems[prevIndex].animState);
    // console.log('sel ' + this.carouselIndex, this.carouselItems[this.carouselIndex].animState);

    this.carouselItems[prevIndex].animState = 'left';
    this.carouselItems[this.carouselIndex].animState = 'normalFromRight';

    // console.log('prev ' + prevIndex, this.carouselItems[prevIndex].animState);
    // console.log('sel ' + this.carouselIndex, this.carouselItems[this.carouselIndex].animState);
    // console.groupEnd();

    this.resetCarouselInterval();
  }

  resetCarouselInterval() {
    clearInterval(this.carouselInterval);
    this.carouselInterval = setInterval(() => {
      this.triggerCarouselRight();
    }, 10 * 1000);
  }

}
