# Copyright (c) 2024, divy and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from datetime import datetime


class Transaction(Document):

    def before_save(self):
        self.validate_stock()
        self.validate_debt()
        self.type == "Issue"
        book = frappe.get_doc("Book", self.book)
        book.status = "Issued"
        book.save()

    def before_submit(self):
        book = frappe.get_doc("Book", self.book)
        today = datetime.today().date()
        return_date = datetime.strptime(self.return_date, '%Y-%m-%d').date()
        if today < return_date:
            self.type = "Return"
        else:
            self.type = "Late Return"

    def validate_stock(self):
        book = frappe.get_doc("Book", self.book)
        if book.status == "Issued":
            frappe.throw("Article is already issued by another member")

    def validate_debt(self):
        member = frappe.get_doc("Member", self.member)
        if member.outstanding_debt > 500:
            frappe.throw("Member has more than 500rs debt")
