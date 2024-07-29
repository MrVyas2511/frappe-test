// Copyright (c) 2024, divy and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Member", {
// 	refresh(frm) {

// 	},
// });
frappe.ui.form.on('Member', {
    refresh: function(frm) {
        frm.add_custom_button('Create Transaction', () => {
            frappe.new_doc('Transaction', {
                library_member: frm.doc.name
            })
        })
    }
});
