; (function ($) {
	$.fn.extend({
		limitChars: function () {
			return this.each(function (index, el) {
				var $Textarea, maxLength, raw_text, actual_text, lengthDiff, info, infoPane;

				var defaultOptions = {
					infoPane: '.char-count',
					messageFormat: '{0} of {1}'
				};

				$Textarea = $(this).addClass('char-limited-' + index);

				var dataAttr = $Textarea.data();

				defaultOptions = $.extend(defaultOptions, dataAttr);

				if (defaultOptions.infoPane) {
					info = true;
					infoPane = $(defaultOptions.infoPane);
				}

				maxLength = parseInt($Textarea.attr('maxlength'));

				defaultOptions.messageFormat = defaultOptions.messageFormat.replace('{1}', maxLength);

				infoPane.text(defaultOptions.messageFormat.replace('{0}', 0));

				$Textarea.keyup(function () {
					raw_text = $Textarea.val();
					if (raw_text.length === 0) {
						$Textarea.attr('maxlength', maxLength);
						infoPane.text(defaultOptions.messageFormat.replace('{0}', 0));
					} else {
						actual_text = raw_text.replace(/ {2,}/g, ' ');
						lengthDiff = raw_text.length - actual_text.length;

						if (lengthDiff > 0 && (maxLength + lengthDiff) >= maxLength) {
							$Textarea.attr('maxlength', (maxLength + lengthDiff));
						}

						if (info) {
							infoPane.text(defaultOptions.messageFormat.replace('{0}', actual_text.length));
						}
					}
				});
			});
		}
	});

	$(function () {
		$('textarea[maxlength]').limitChars();
	});
})(jQuery);