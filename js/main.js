// Đối tượng validator
function Validator(options) {
  // Lấy element của form cần check
  var formElement = document.querySelector(options.form);

  // hàm check valid form required
  function validate(inputElement, rule) {
    var errorMessage = rule.test(inputElement.value);
    var errorElement =
      inputElement.parentElement.parentElement.querySelector(".form-message");
    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.parentElement.classList.add("invalid");
    } else {
      errorElement.innerText = "";
      inputElement.parentElement.parentElement.classList.remove("invalid");
    }
  }
  function clearError(inputElement) {
    var errorElement =
      inputElement.parentElement.parentElement.querySelector(".form-message");
    errorElement.innerText = "";
    inputElement.parentElement.parentElement.classList.remove("invalid");
  }
  // Kiểm tra nếu có form
  if (formElement) {
    var submitButton = document.getElementById("send");
    submitButton.addEventListener("click", function (event) {
      event.preventDefault();
      options.rules.forEach(function (rule) {
        var inputElement = formElement.querySelector(rule.selector);
        validate(inputElement, rule);
      });
      // Check lại message box
      var inputComment = document.querySelector(options.elseRules[1].selector);
      var errorElement = inputComment.nextElementSibling;
      var errorMessage = options.elseRules[1].test(inputComment.value);
      if (errorMessage) {
        errorElement.innerText = errorMessage;
        inputComment.parentElement.classList.add("invalid");
      } else {
        errorElement.innerText = "";
        inputComment.parentElement.classList.remove("invalid");
      }
      // Check checkbox interest
      var errorElementCheckbox = document
        .querySelector(options.elseRules[0].selector)
        .querySelector(".form-message");
      console.log(errorElementCheckbox);
      var checkboxes = formElement.querySelectorAll(".checkbox");
      var isValid = false;
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          isValid = true;
        }
      });
      var errorMessageCheckbox = options.elseRules[0].test(isValid);
      if (errorMessageCheckbox) {
        errorElementCheckbox.innerText = errorMessageCheckbox;
        errorElementCheckbox.parentElement.classList.add("invalid");
      } else {
        errorElementCheckbox.innerText = "";
        errorElementCheckbox.parentElement.classList.remove("invalid");
      }
      console.log(isValid);
    });
    // Thực hiện duyệt qua list rules bên trong options(list truyền vào)
    options.rules.forEach(function (rule) {
      // Lấy thằng con của form là input cần check(selector)
      var inputElement = formElement.querySelector(rule.selector);
      // Kiểm tra nếu có thẻ input
      if (inputElement) {
        // Kiểm tra sự kiện onblur ra ngoài thẻ
        inputElement.onblur = function () {
          // Value: inputElement.value
          // test func: rule.test
          // Gọi hàm check require
          validate(inputElement, rule);
        };
        // Xử lý mỗi khi người dùng nhập vào input
        inputElement.oninput = function () {
          clearError(inputElement);
        };
      }
    });
  }
  // Check comment
  var inputComment = document.querySelector(options.elseRules[1].selector);
  var errorElement = inputComment.nextElementSibling;
  // Check blur
  inputComment.onblur = function () {
    var errorMessage = options.elseRules[1].test(inputComment.value);
    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputComment.parentElement.classList.add("invalid");
    } else {
      errorElement.innerText = "";
      inputComment.parentElement.classList.remove("invalid");
    }
    // Check khi ấn vào message box
    inputComment.oninput = function () {
      errorElement.innerText = "";
      inputComment.parentElement.classList.remove("invalid");
    };
  };
}

// Định nghĩa các rules
// Nguyên tắc của rules:
// 1. Khi có lỗi => trả ra message
// 2. Khi hợp lệ => Ko rả ra gì cả (undefined)
Validator.isName = function (selector) {
  return {
    selector: selector,
    // Nguyên tắc bắt lỗi
    test: function (value) {
      if (value.trim().length == 0) {
        if (selector == "#firstname") {
          return "First name is required";
        } else {
          return "Last name is required";
        }
      } else if (
        (value.trim().length > 0 && value.trim().length < 3) ||
        value.trim().length > 30
      ) {
        if (selector == "#firstname") {
          return "First name has from 3 to 30 characters";
        } else {
          return "Last name has from 3 to 30 characters";
        }
      }
    },
  };
};
Validator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (value.length == 0) {
        return "Email is required";
      } else if (!regex.test(value)) return "Email is not valid";
    },
  };
};
Validator.isPhoneNumber = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
      if (value.length == 0) {
        return "Phone number is required";
      } else if (!regex.test(value)) {
        return "Phone number is not valid";
      }
    },
  };
};

Validator.isCheckInterest = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      if (!value) {
        return "Interest at least one checkbox checked";
      }
    },
  };
};
Validator.isComment = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      if (value.trim().length == 0) {
        return "Comment content is required";
      } else if (value.trim().length < 20) {
        return "Comment has at least 20 characters";
      }
    },
  };
};

// Responsive nav
function checkClick() {
  var navElement = document.querySelector("nav");
  var ulElement = navElement.querySelector("ul");
  ulElement.classList.toggle("mobile");
  var overlay = navElement.parentElement.querySelector(".nav-overlay");
  overlay.classList.toggle("nav-overlay-open");
}
var barButton = document.querySelector(".icon-nav");
// Check icon bar khi click vào
barButton.addEventListener("click", function () {
  // Check icon bị ấn
  checkClick();
});
//Check vào overlay
var overlayElement = document.querySelector(".nav-overlay");
overlayElement.addEventListener("click", function () {
  checkClick();
});
//Check khi click vào thẻ a
var navElement = document.querySelector("nav");
var links = navElement.getElementsByTagName("a");
for (var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function () {
    if (window.innerWidth < 1024) {
      checkClick();
    }
  });
}
