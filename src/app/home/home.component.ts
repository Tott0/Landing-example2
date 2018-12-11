import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { AppConstants } from '@app/app-constants';
import { getErrorMessage } from '@core/static-methods';

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
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {

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

  constructor(
    private formBuilder: FormBuilder,
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

}
