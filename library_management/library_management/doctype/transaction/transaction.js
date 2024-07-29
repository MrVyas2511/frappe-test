// Copyright (c) 2024, divy and contributors
// For license information, please see license.txt

frappe.ui.form.on("Transaction", {
	before_submit: function(frm) {
		const today = new Date()
		const returnDate  = new Date(frm.doc.return_date)
		if(today > returnDate) {
			let delta = (today - returnDate) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
			const late_fee = 20*Math.floor(delta)
			frappe.show_alert(`OOPS, You missed the deadline. You will have to pay Late fees: ${late_fee}`);
		}
	},
	refresh(frm) {
		// TODO: Process to do on refresh
	},
	late_fee(frm) {
		frm.set_value("total_fee", frm.doc.late_fee + frm.doc.fee);
	},
	fee(frm) {
		frm.set_value("total_fee", frm.doc.late_fee + frm.doc.fee);
	},
	return_date(frm) {
		let issueDate = new Date(frm.doc.issue_date);
		let returnDate = new Date(frm.doc.return_date);
		let delta = (returnDate - issueDate) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
		frm.set_value("fee", delta * 10)
	}
});
