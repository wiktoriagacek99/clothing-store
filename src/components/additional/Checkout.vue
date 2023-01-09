<template>
  <div class="checkout-page" id="checkout-page">
    <form ref="form" @submit="submitForm">
      <div class="checkout">
        <div v-for="(field, index) in form" :key="index" :class="field.class">
          <label v-if="field.type === 'checkbox'">
            <span>{{ field.label }}</span>
            <input
              :name="field.name"
              :type="field.type"
              v-model="field.value"
            />
          </label>
          <label
            v-else-if="field.type === 'radio'"
            v-for="(radioField, index) in field.values"
            :key="index"
          >
            <span>{{ radioField.label }}</span>
            <input
              :name="field.name"
              :type="field.type"
              :value="radioField.value"
              v-model="field.currentValue"
            />
          </label>
          <label
            v-else
            :class="
              (field.displayable === 'isOtherAddress' &&
                !form.isOtherAddress.value) ||
              (field.displayable === 'isCompany' && !form.isCompany.value) ||
              (field.displayable === 'payment' &&
                form.payment.currentValue !== 'creditCard')
                ? 'hidden'
                : ''
            "
          >
            <span>{{ field.label }}</span>
            <input
              :name="field.name"
              :type="field.type"
              v-model="field.value"
              @change="validate($event, field)"
            />
            <i v-for="error in field.errors" :key="error">
              {{ getErrorMessage(error) }}
            </i>
          </label>
        </div>
      </div>
      <div class="btn">
        <input type="submit" class="submit" value="BUY NOW" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  data() {
    return {
      form: {
        name: {
          name: "name",
          label: "First name",
          value: null,
          errors: [],
          rules: ["required"],
          type: "text",
        },
        lastname: {
          name: "lastname",
          label: "Last name",
          value: null,
          errors: [],
          rules: ["required"],
          type: "text",
        },
        address: {
          name: "address",
          label: "Address",
          value: null,
          errors: [],
          rules: ["required"],
          type: "text",
        },
        postCode: {
          name: "post_code",
          label: "Post code",
          value: null,
          errors: [],
          rules: ["required", "postCode"],
          type: "text",
        },
        isCompany: {
          name: "is_company",
          class: "is_company check",
          label: "Is company?",
          value: null,
          errors: [],
          rules: [],
          type: "checkbox",
          checked: false,
        },
        company: {
          name: "company",
          class: "company",
          label: "Company",
          value: null,
          errors: [],
          rules: ["required"],
          type: "text",
          displayable: "isCompany",
        },
        nip: {
          name: "nip",
          class: "nip ",
          label: "NIP",
          value: null,
          errors: [],
          rules: ["required", "nip"],
          type: "text",
          displayable: "isCompany",
        },
        isOtherAddress: {
          name: "is_other_address",
          class: "is_other_address check",
          label: "Is other address?",
          value: false,
          errors: [],
          rules: [],
          type: "checkbox",
        },
        otherAddress: {
          name: "other_address",
          class: "other_address ",
          label: "Adres",
          value: null,
          errors: [],
          rules: ["required"],
          type: "text",
          displayable: "isOtherAddress",
        },
        otherPostCode: {
          name: "other_post_code",
          class: "other_post_code ",
          label: "Kod",
          value: null,
          errors: [],
          rules: ["required", "postCode"],
          type: "text",
          displayable: "isOtherAddress",
        },
        payment: {
          name: "payment",
          class: "payment_method check",
          errors: [],
          rules: [],
          type: "radio",
          currentValue: "blik",
          values: {
            creditTransfer: {
              value: "creditTransfer",
              label: "Credit transfer",
            },
            blik: {
              value: "blik",
              label: "BLIK",
            },
            creditCard: {
              value: "creditCard",
              label: "Credit card",
            },
          },
        },
        cardNumber: {
          name: "card_number",
          class: "card_number ",
          label: "Card number",
          value: null,
          errors: [],
          rules: ["required", "cardNumber"],
          type: "text",
          displayable: "payment",
        },
        expirationDate: {
          name: "expiration_date",
          class: "expiration_date ",
          label: "Expiration date",
          value: null,
          errors: [],
          rules: ["required", "expirationDate", "pastDate"],
          type: "text",
          displayable: "payment",
        },
        CVV: {
          name: "cvv",
          class: "cvv ",
          label: "CVV",
          value: null,
          errors: [],
          rules: ["required", "CVV"],
          type: "text",
          displayable: "payment",
        },
      },
    };
  },
  methods: {
    validate: function (event, field) {
      field.errors = [];

      if (
        field.displayable &&
        this.form[field.displayable].type === "checkbox" &&
        !this.form[field.displayable].value
      )
        return;

      if (
        field.displayable &&
        this.form[field.displayable].type === "radio" &&
        this.form[field.displayable].currentValue !== "creditCard"
      )
        return;

      for (const rule of field.rules) {
        switch (rule) {
          case "required":
            if (!field.value) field.errors.push("required");
            break;
          case "nip":
            if (
              !/^([0-9]{3})-([0-9]{3})-([0-9]{2})-([0-9]{2})$/.test(field.value)
            )
              field.errors.push("nip");
            break;
          case "postCode":
            if (!/^[0-9]{2}-[0-9]{3}$/.test(field.value))
              field.errors.push("postCode");
            break;
          case "cardNumber":
            if (
              !/^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/.test(
                field.value
              )
            )
              field.errors.push("cardNumber");
            break;
          case "expirationDate": //miesiac/rok
            if (!/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(field.value))
              field.errors.push("expirationDate");
            break;
          case "pastDate": {
            if (field.value) {
              const formattedDate = field.value.split("/");
              if (
                new Date("20" + formattedDate[1], formattedDate[0]) < new Date()
              )
                field.errors.push("pastDate");
            }
            break;
          }
          case "CVV":
            if (!/^[0-9]{3,4}$/.test(field.value)) field.errors.push("CVV");
            break;
        }
      }
    },
    getErrorMessage: function (error) {
      switch (error) {
        case "required":
          return "This field is required";
        case "nip":
          return "Bad NIP format";
        case "postCode":
          return "Bad post code format";
        case "cardNumber":
          return "Bad card number format";
        case "expirationDate":
          return "Bad expiration date format";
        case "pastDate":
          return "Date must be in the future";
        case "CVV":
          return "Bad CVV format";
      }
    },
    submitForm: function (event) {
      event.preventDefault();

      let error = false;
      for (const prop in this.form) {
        if (Object.prototype.hasOwnProperty.call(this.form, prop)) {
          this.validate(null, this.form[prop]);
          if (this.form[prop].errors.length) error = true;
        }
      }

      if (error) return;

      const data = {
        name: this.form.name.value,
        lastname: this.form.lastname.value,
        address: this.form.address.value,
        postCode: this.form.postCode.value,
        company: this.form.company.value,
        nip: this.form.nip.value,
        otherAddress: this.form.otherAddress.value,
        otherPostCode: this.form.otherPostCode.value,
        isCompany: this.form.isCompany.value,
        isOtherAddress: this.form.isOtherAddress.value,
        payment: this.form.payment.values[this.form.payment.currentValue].label,
        validated: true,
      };
      this.$store.dispatch("setData", data);
      this.$router.push({ name: "Summary" });
    },
  },
};
</script>

<style lang="scss" scoped>
.hidden {
  display: none !important;
}

form {
  position: relative;
  padding: 0 20px;
}
.checkout {
  display: flex;
  flex-wrap: wrap;
}

.checkout div {
  width: 100%;
}

.checkout div label {
  display: flex;
  width: 100%;
  padding: 6px;
  align-items: center;
}

.checkout span {
  flex: 0 0 30%;
  max-width: 30%;
  text-align: right;
  margin-right: 10px;
  font-weight: bold;
}
.checkout i {
  margin-left: 10px;
  color: red;
  font-size: 13px;
  font-weight: bold;
}

.checkout input:focus {
  outline: none;
}

.check label {
  display: inline-flex;
  cursor: pointer;
  position: relative;
}

.check label > span {
  color: black;
  padding: 0.5rem 0.25rem;
}

.check label > input {
  height: 25px;
  width: 25px;
  appearance: none;
  border: 1px solid grey;
  outline: none;
  cursor: pointer;
}

.check label > input:checked {
  border: 1px solid black;
  background-color: transparent;
  background-image: url("../../assets/images/check.svg");
  background-size: cover;
}

.check label > input:checked + span::before {
  display: block;
  text-align: center;
  position: absolute;
  left: 0.7rem;
  top: 0.2rem;
}

.check label > input:hover {
  border: 1px solid black;
  background-color: #f0f0f0;
  transition-duration: 0.3s;
}
.btn {
  width: 100%;
  text-align: right;
}
.submit {
  text-align: center;
  background-color: #1f1d1d !important;
  color: white !important;
  font-size: 15px;
  cursor: pointer;
  white-space: nowrap;
  border: 1px solid transparent;
  line-height: 1.5;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  padding: 7px 30px;
  text-decoration: none;
  height: 40px;
  display: inline-block;
}
.submit:hover {
  color: #1f1d1d !important;
  background-color: white !important;
}

@media screen and (max-width: 700px) {
  .product {
    flex-direction: column;
  }
}

form .checkout div:nth-child(1):before {
  content: "Shiping Info";
  display: inline-block;
  position: relative;
  top: 2px;
  font-weight: bold;
  color: #1f1d1d;
  font-size: 30px;
}
form .checkout div:nth-child(11):before {
  content: "Billing Info";
  display: inline-block;
  position: relative;
  top: 2px;
  font-weight: bold;
  color: #1f1d1d;
  font-size: 30px;
  margin-top: 25px;
}
</style>
