import { Injectable, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { PageService } from 'ngx-seo-page';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  @Output() loader_callback: EventEmitter<any> = new EventEmitter();
  constructor(public toastr: ToastrService, public translate: TranslateService, public loader: NgxUiLoaderService, private seoService: PageService) { }

  getItem(key) {
    return localStorage.getItem(key);
  }

  setItem(key, value) {
    localStorage.setItem(key, value);
  }

  deleteItem(key) {
    localStorage.removeItem(key)
  }

  startLoader(text = 'Loading...') {
    this.loader_callback.emit(text);
    this.loader.start();
  }

  stopLoader() {
    this.loader.stop();
  }

  stopLoaderWithTableReload() {
     $("#datatable").dataTable().fnDestroy()
    this.loader.stop();
    setTimeout(() => {
      $('#datatable').DataTable({ordering: false, lengthChange: true, paging: true });
    }, 1000);
  }

  setDefaultLocale(locale) {
    this.translate.setDefaultLang(locale)
  }

  getLocale(string) {
    this.translate.get(string)
  }

  updatePageSEO(title, name, url = '', image = '') {
     this.seoService.updatePage({
      title: title,
      schema: {
        '@type': 'WebSite',
        name: name,
        url: window.location.host,
      },
      metatags: [
        { name: 'description', content: name },
        { property: 'og:url', content: url },
        { property: 'og:title', content: title },
      ],
      canonical: window.location.host,
    });
  }

  showSuccessAlert(title = 'Success', description) {
    this.toastr.success(description, title);
  }

  showErrorAlert(title = 'Error', description) {
    this.toastr.error(description, title);
  }

}
