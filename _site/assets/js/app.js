(function() {
  var Choosealicense;

  Choosealicense = (function() {
    Choosealicense.prototype.selectText = function(element) {
      var range, selection;
      if (document.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(element);
        return range.select();
      } else if (window.getSelection) {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        return selection.addRange(range);
      }
    };

    Choosealicense.prototype.qtip_position = {
      my: "top center",
      at: "bottom center"
    };

    Choosealicense.prototype.ruletypes = {
      permissions: "Permission",
      conditions: "Condition",
      limitations: "Limitation"
    };

    function Choosealicense() {
      this.initTooltips();
      this.initClipboard();
    }

    Choosealicense.prototype.initTooltips = function() {
      var i, label, len, ref, ref1, rule, rules, ruletype;
      ref = window.annotations;
      for (ruletype in ref) {
        rules = ref[ruletype];
        for (i = 0, len = rules.length; i < len; i++) {
          rule = rules[i];
          $(".license-" + ruletype + " ." + rule["tag"]).attr("title", rule["description"]);
        }
      }
      ref1 = this.ruletypes;
      for (ruletype in ref1) {
        label = ref1[ruletype];
        $(".license-" + ruletype + " li, .license-" + ruletype + " .license-sprite").qtip({
          content: {
            text: false,
            title: {
              text: label
            }
          },
          position: this.qtip_position,
          style: {
            classes: "qtip-shadow qtip-" + ruletype
          }
        });
      }
      return false;
    };

    Choosealicense.prototype.initClipboard = function() {
      var clip;
      $(".js-clipboard-button").data("clipboard-prompt", $(".js-clipboard-button").text());
      clip = new Clipboard(".js-clipboard-button");
      clip.on("mouseout", this.clipboardMouseout);
      return clip.on("complete", this.clipboardComplete);
    };

    Choosealicense.prototype.clipboardMouseout = function(client, args) {
      return this.textContent = $(this).data("clipboard-prompt");
    };

    Choosealicense.prototype.clipboardComplete = function(client, args) {
      return this.textContent = "Copied!";
    };

    return Choosealicense;

  })();

  $(function() {
    return new Choosealicense();
  });

}).call(this);
