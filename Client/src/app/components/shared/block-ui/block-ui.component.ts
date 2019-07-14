import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy } from '@angular/core';
import { AppBlockUIService } from "../../../services/shared/app-blockUI.service";
import { Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-block-ui',
  templateUrl: './block-ui.component.html',
  styleUrls: ['./block-ui.component.scss']
})
export class BlockUIComponent implements AfterViewInit, OnDestroy {

  debounceTime: number = 200;
  loading: boolean = false;
  loadingSubscription: Subscription;

  constructor(private loadingScreenService: AppBlockUIService,
    private _elmRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef) { }

    // ngOnInit() {
    //   this.loadingSubscription = this.loadingScreenService.loadingStatus.pipe(
    //     debounceTime(200)
    //   ).subscribe((value) => {
    //     this.loading = value;
    //   });
    // }

  ngAfterViewInit(): void {
    this._elmRef.nativeElement.style.display = 'none';
    this.loadingSubscription = this.loadingScreenService.loadingStatus.pipe(debounceTime(this.debounceTime)).subscribe(
      (status: boolean) => {
        this._elmRef.nativeElement.style.display = status ? 'block' : 'none';
        this._changeDetectorRef.detectChanges();
      }
    );
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
