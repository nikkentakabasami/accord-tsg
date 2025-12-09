


export class TabbedPanel {

	$tabPanel;

	$tabs;
	$tabContents;
	selectedTab;

	constructor(tabPanelSelector) {

		this.$tabPanel = $(tabPanelSelector);

		this.$tabs = this.$tabPanel.find(".tab")
		this.$tabContents = this.$tabPanel.find(".tab-content")
		
		
//		this.$tabs.click(function(e) {
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



	}



}








$(function() {



})


