# Copyright (c) 2024, divy and contributors
# For license information, please see license.txt

from frappe.website.website_generator import WebsiteGenerator
import requests
import frappe

class Book(WebsiteGenerator):
    pass

@frappe.whitelist()
def import_books_from_api(isbn="", book_title="", authors=""):
    url = f"https://frappe.io/api/method/frappe-library"
    print("count"+url)
    response = requests.get(url,
		params={
			'isbn':isbn,
			'title': book_title,
			'authors': authors
		}
	)
    if response.status_code == 200:
        books = response.json()["message"]
        for book in books:
            create_book_record(book)

def create_book_record(book):
    existing_book = frappe.get_all('Book', filters={'isbn': book['isbn']}, limit=1)
    if existing_book:
        book_doc = frappe.get_doc('Book', existing_book[0].name)
        book_doc.update({
            "title": book["title"],
            "author": book["authors"],
            "publisher": book["publisher"],
            # "pages": book["num_pages"],
            "quantity": book_doc.quantity + 1
        })
        book_doc.save()
    else:
        frappe.get_doc({
            "doctype": "Book",
            "title": book["title"],
            "author": book["authors"],
            "isbn": book["isbn"],
            "publisher": book["publisher"],
            # "pages": book["num_pages"],
            "quantity": 1
        }).insert()
