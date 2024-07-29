function ButtonFunction(listview) {
    let d = new frappe.ui.Dialog({
        title: 'Import Books',
        fields: [
            {
                label: 'ISBN No.',
                fieldname: 'isbn',
                fieldtype: 'Int',
                placeholder: 'Enter isbn number of books to import'
            },
			{
                label: 'Book title',
                fieldname: 'book_title',
                fieldtype: 'Data',
                placeholder: 'Enter title of books to import'
            },
			{
                label: 'Author',
                fieldname: 'authors',
                fieldtype: 'Data',
                placeholder: 'Enter Author of books to import'
            }
        ],
        primary_action_label: 'Import',
        primary_action(values) {
            frappe.call({
                method: 'library_management.library_management.doctype.book.book.import_books_from_api',
                args: {
					isbn: values.isbn,
                    book_title: values.book_title,
					authors: values.authors
                },
                callback: function(response) {
                    frappe.msgprint('Books imported successfully.');
                    listview.refresh();  // Refresh the list view to show the newly imported books
                    d.hide();
                }
            });
        }
    });
    d.show();
}


frappe.listview_settings['Book'] = {
	refresh: function(frm) {
        frm.page.add_inner_button("Import Books", function() {
            ButtonFunction()
       });;
   },
   onload: function(listview) {
	debugger;
    }
};
