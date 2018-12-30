import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { AppConstants } from '@app/app-constants';
import { getErrorMessage } from '@core/static-methods';
import { Router, ActivatedRoute } from '@angular/router';

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
  @ViewChild('mapSearch', { read: ElementRef }) mapSearch: ElementRef;

  carouselItems = [
    {
      id: 1,
      img: 'assets/images/warehouse2.jpg',
      title: 'El espacio que necesites donde lo necesites.',
      subtitle: 'Olvídate de las cláusulas de permanencia y extensos procesos de contratación.',
      animState: 'normal'
    },
    {
      id: 2,
      img: 'assets/images/warehouse3.jpg',
      title: 'La primera red de bodegas más grande del país',
      subtitle: 'Encuentra espacios de manera rápida, sencilla y flexible en una sola plataforma.',
    },
    {
      id: 3,
      img: 'assets/images/warehouse4.jpg',
      title: 'Convierte tus espacios improductivos en ganancias extras.',
      subtitle: 'Publica tu espacio y te conectamos con tus próximos clientes.',
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

  errors: any = {};
  warehouseForm: FormGroup;
  get city() { return this.warehouseForm.get('city'); }
  get pallets() { return this.warehouseForm.get('pallets'); }
  getErrorMessage = getErrorMessage;

  iLat = 10.9838119;
  iLng = -74.8180175;
  zoom = 13;

  latestPosts = [
    {
      url: 'blog-post-1',
      img: 'assets/images/blog-post-small-1.jpg',
      title: 'Mauris tincidunt ex eget dictum.',
      text: 'incididunt ut labore et dolore magna aliqua. Ut enim aminim veniam, quis nostrud...',
    },
    {
      url: 'blog-post-2',
      img: 'assets/images/blog-post-small-2.jpg',
      title: 'Morbi pharetra, felis a facilisis.',
      text: 'incididunt ut labore et dolore magna aliqua. Ut enim aminim veniam, quis nostrud...',
    },
    {
      url: 'blog-post-3',
      img: 'assets/images/blog-post-small-3.jpg',
      title: 'Curabitur fringilla ac lorem nec.',
      text: 'incididunt ut labore et dolore magna aliqua. Ut enim aminim veniam, quis nostrud...',
    }
  ];


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    AppConstants.isAtHome = true;

    this.warehouseForm = this.formBuilder.group({
      city: ['', [Validators.required]],
      pallets: ['', [Validators.required, Validators.min(0)]],
    });

    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      this.iLat = position.coords.latitude;
      this.iLng = position.coords.longitude;
    });
  }

  ngOnDestroy() {
    AppConstants.isAtHome = false;
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

  searchWarehouses() {
    const u = {
      cd: this.city.value,
      up: this.pallets.value,
    };

    console.log(u);

    // setTimeout(() => {
    this.router.navigate(['/temproute_client/temproute_map', u]).then(
      success => this.errors.message = success ? '' : 'No se encontraton bodegas con los parametros seleccionados',
      err => console.error(err)
    );
    // }, 500);
  }

  triggerCarouselLeft() {
    const prevIndex = this.carouselIndex;
    if (--this.carouselIndex < 0) {
      this.carouselIndex = this.carouselItems.length - 1;
    }
    console.group('group');

    console.log('prev ' + prevIndex, this.carouselItems[prevIndex].animState);
    console.log('sel ' + this.carouselIndex, this.carouselItems[this.carouselIndex].animState);

    this.carouselItems[prevIndex].animState = 'right';
    this.carouselItems[this.carouselIndex].animState = 'normalFromLeft';

    console.log('prev ' + prevIndex, this.carouselItems[prevIndex].animState);
    console.log('sel ' + this.carouselIndex, this.carouselItems[this.carouselIndex].animState);
    console.groupEnd();
  }
  triggerCarouselRight() {
    const prevIndex = this.carouselIndex;
    if (++this.carouselIndex >= this.carouselItems.length) {
      this.carouselIndex = 0;
    }
    console.group('group');

    console.log('prev ' + prevIndex, this.carouselItems[prevIndex].animState);
    console.log('sel ' + this.carouselIndex, this.carouselItems[this.carouselIndex].animState);

    this.carouselItems[prevIndex].animState = 'left';
    this.carouselItems[this.carouselIndex].animState = 'normalFromRight';

    console.log('prev ' + prevIndex, this.carouselItems[prevIndex].animState);
    console.log('sel ' + this.carouselIndex, this.carouselItems[this.carouselIndex].animState);
    console.groupEnd();
  }

  scrollToMap() {
    console.log(this.mapSearch);
    window.scrollTo({
      top: this.mapSearch.nativeElement.offsetTop - 50,
      behavior: 'smooth'
    });
  }

}
