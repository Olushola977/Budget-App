class UI {
	constructor() {
		this.budgetFeedback = document.querySelector('.budget-feedback');
		this.expenseFeedback = document.querySelector('.expense-feedback');
		this.budgetForm = document.getElementById('budget-form');
		this.budgetInput = document.getElementById('userBudget');
		this.budgetAmount = document.getElementById('budgetAmount');
		this.expenseAmount = document.getElementById('expenseAmount');
		this.balance = document.getElementById('balance');
		this.balanceAmount = document.getElementById('balanceAmount');
		this.expenseForm = document.getElementById('expense-form');
		this.expenseInput = document.getElementById('userExpenseTitle');
		this.amountInput = document.getElementById('userExpense');
		this.expenseList = document.getElementById('expense-list');
		this.itemList = [];
		this.itemID = 0;
	}


	submitBudgetForm() {
		const value = this.budgetInput.value;
		if (value === '' || value < 0) {
			this.budgetFeedback.classList.add("showItem");
			const self = this;
			setTimeout(function() {
				self.budgetFeedback.classList.remove("showItem");
			}, 4000);
		} else {
			this.budgetAmount.textContent = value;
			this.budgetInput.value = '';
			this.showBalance();
		}
	}

	showBalance() {
		const expense = this.totalExpense();
		const total = parseInt(this.budgetAmount.textContent) - expense;
		this.balanceAmount.textContent = total;
		if (total < 0) {
			this.balance.classList.remove("showGreen", "showWhite");
			this.balance.classList.add("showRed");
		}

		if (total === 0) {
			this.balance.classList.remove("showGreen", "showRed");
			this.balance.classList.add("showWhite");
		}

		if (total > 0) {
			this.balance.classList.remove("showRed", "showWhite");
			this.balance.classList.add("showGreen");
		}
	}

	submitExpenseForm() {
		const expenseValue = this.expenseInput.value;
		const amountValue = this.amountInput.value;

		if (expenseValue === '' || amountValue === '' || amountValue < 0) {
			this.expenseFeedback.classList.add("showItem");
			const self = this;
			setTimeout(function() {
				self.expenseFeedback.classList.remove("showItem");
			}, 4000);
		} else {
			let amount = parseInt(amountValue);
			this.expenseInput.value = "";
			this.amountInput.value = "";

			let expense = {
				id: this.itemID,
				title: expenseValue,
				amount: amount,
			};

			this.itemID++;
			this.itemList.push(expense);
			this.addExpense(expense);
			this.showBalance();

		}

	}

	totalExpense() {
		let total = 0;
		if (this.itemList.length > 0) {
			total = this.itemList.reduce(function(acc, curr) {
				acc += curr.amount;
				return acc;
			}, 0);
		}

		this.expenseAmount.textContent = total;
		return total;
	}

	editExpense(element) {
		let id = parseInt(element.dataset.id);
		let parent = element.parentElement.parentElement.parentElement.parentElement;
		
		this.expenseList.removeChild(parent);
		

		let expense = this.itemList.find(function(item) {
			return item.id === id;

		});
		

		let tempList = this.itemList.filter(function(item) {
			return item.id !== id;
		});

		this.itemList = tempList;
		this.showBalance();
		this.expenseInput.value = expense.title;
		this.amountInput.value = expense.amount;


	}

	deleteExpense(element) {
		let id = parseInt(element.dataset.id);
		let parent = element.parentElement.parentElement.parentElement.parentElement;
		
		this.expenseList.removeChild(parent);

		let tempList = this.itemList.filter(function(item) {
			return item.id !== id;
		});

		this.itemList = tempList;
		this.showBalance();

	}

	addExpense(expense) {
		const div = document.createElement('div');
		div.classList.add('expense');
		div.innerHTML = `<div class="expense"><div class="expense-item d-flex px-3 justify-content-between align-items-baseline" id="edit">
		<h5 class="expense-title mb-0 text-uppercase list-item">-${expense.title}</h5>
		<h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>
		<div class="expense-icons list-item">
		<a href="#" class="edit-icon icon mx-2" data-id="${expense.id}"><i class="fas iconBlue fa-edit">H</i></a>
		<a href="#" class="delete-icon icon" data-id="${expense.id}"><i class="fas iconRed fa-trash">M</i></a>
		</div>
		</div>`;
		this.expenseList.appendChild(div);

	}

	totalExpense() {
		let total = 0;
		if (this.itemList.length > 0) {
			total = this.itemList.reduce(function(acc, curr) {
				acc += curr.amount;
				return acc;
			}, 0);
		}

		this.expenseAmount.textContent = total;
		return total;
	}

}





function eventListeners() {
	// body...
	const budgetForm = document.getElementById('budget-form');
	const expenseForm = document.getElementById('expense-form');
	const expenseList = document.getElementById('expense-list');


	const ui = new UI();


	budgetForm.addEventListener("submit", function(event) {
		event.preventDefault();
		ui.submitBudgetForm();

	});

	expenseForm.addEventListener("submit", function(event) {
		event.preventDefault();
		ui.submitExpenseForm();
	});

	expenseList.addEventListener("click", function(event) {
		if(event.target.parentElement.classList.contains('edit-icon')) {
			ui.editExpense(event.target.parentElement);
		}
		else if(event.target.parentElement.classList.contains('delete-icon')) {
			ui.deleteExpense(event.target.parentElement);
		}
	})
}


document.addEventListener('DOMContentLoaded', function() {
	eventListeners();
});
