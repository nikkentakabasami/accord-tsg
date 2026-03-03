


export class TabbedPanel {

	$tabPanel;

	$tabs;
	$tabContents;
	selectedTab;

	constructor(tabPanelSelector) {

		this.$tabPanel = $(tabPanelSelector);

		if (!this.$tabPanel.length){
			return;
		}
		
		this.$tabPanel.addClass("tabbed-panel");
		
		let $tabContainer = this.$tabPanel.children(".tab-container");
		
		this.$tabs = $tabContainer.children("button");
		
		this.$tabs.each(function( index ) {
			let $b = $(this);
			
			$b.data("tab",index);
			$b.addClass("tab");
			if (index==0){
				$b.addClass("active");
			}
		});
		
		this.$tabContents = this.$tabPanel.children(".tab-content")
		
		this.$tabContents.each(function( index ) {
			let $c = $(this);
			if (index==0){
				$c.addClass("active");
			}
			
		});
		
		let $filter = $tabContainer.children(".tab-filler");
		if (!$filter.length){
			$('<div class="tab-filler"></div>').appendTo($tabContainer);
		}
/*
<div class="tab-filler"></div>
*/		
		
		this.$tabs.click(e => {
			e.preventDefault();
			this.$tabs.removeClass("active");
			let tabIndex = $(e.target).addClass("active").data("tab");

			this.$tabContents.removeClass("active");
			let $c = this.$tabContents.eq(tabIndex);
			$c.addClass("active");

		});
	}

}

/*
	constructor(tabPanelSelector) {

		this.$tabPanel = $(tabPanelSelector);

		this.$tabs = this.$tabPanel.find(".tab-container>.tab")
		this.$tabContents = this.$tabPanel.children(".tab-content")
		
		
		this.$tabs.click(e => {
			e.preventDefault();
			this.$tabs.removeClass("active");
			let selectedTab = $(e.target).addClass("active").data("tab");
			//		let t = $(this).data("tab");
			//		alert (t);

			this.$tabContents.removeClass("active");
			this.$tabPanel.find("#tab-" + selectedTab).addClass("active");
//			this.$tabContents[selectedTab].addClass("active");


		});
*/






$(function() {



})


