import { Component, OnInit, ElementRef } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor( private elementRef: ElementRef ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // $(this.elementRef.nativeElement).find('[data-toggle="tooltip"]').tooltip();
    $('body').tooltip({
        selector: '.tooltp'
    });

    $(document).mouseup(function(e) {
        var container = $('.nav-item .dropdown-box');
        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $('.nav-item .dropdown-box').fadeOut();
        }
      
      $('.header__btn').unbind()
          .click(function () {
            console.log('click1');

            $(this).toggleClass('header__btn--active');
            $('.header__menu').toggleClass('header__menu--active');
          });
      
        $('.nav-action')
          .unbind()
          .click(function () {
            console.log('click');
            $('.header__btn').toggleClass('header__btn--active');
            $('.header__menu').toggleClass('header__menu--active');
          });

        $('.header__search .close, .header__action--search button').on(
          'click',
          function () {
            $('.header__search').toggleClass('header__search--active');
          }
        );
    });
    

  }
}
