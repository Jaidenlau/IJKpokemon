/* Contact form — front-end only for this first iteration.
   No backend is wired up yet: submitting shows a confirmation and hands the
   visitor a pre-filled mailto so nothing is silently lost. Replace the
   handler body with a POST to your form endpoint when one exists. */
(function () {
  'use strict';

  var form = document.getElementById('enquiry-form');
  if (!form) return;

  var status = document.getElementById('form-status');

  // Pre-select the category when arriving from a /supply.html "Enquire" link
  // (e.g. /contact.html?interest=cartons).
  var wanted = new URLSearchParams(window.location.search).get('interest');
  var select = form.querySelector('select[name="interest"]');
  if (wanted && select) {
    var match = Array.prototype.some.call(select.options, function (o) { return o.value === wanted; });
    if (match) select.value = wanted;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var data = new FormData(form);
    var lines = [
      'Name / お名前: ' + (data.get('name') || ''),
      'Company / 会社名: ' + (data.get('company') || ''),
      'Country / 国・地域: ' + (data.get('country') || ''),
      'Email: ' + (data.get('email') || ''),
      'Phone / 電話: ' + (data.get('phone') || ''),
      'Interest / ご希望の商品: ' + (data.get('interest') || ''),
      'Volume / 数量: ' + (data.get('volume') || ''),
      '',
      (data.get('message') || '')
    ];

    var href = 'mailto:' + form.dataset.mailto +
      '?subject=' + encodeURIComponent('Wholesale enquiry / 卸売のお問い合わせ') +
      '&body=' + encodeURIComponent(lines.join('\n'));

    if (status) {
      status.classList.add('show');
      status.innerHTML =
        'ありがとうございます。メールソフトが開きます — 送信を完了してください。<br>' +
        '<span class="en-sentence">Thank you. Your email app will open — please press send to complete your enquiry. ' +
        'If nothing opens, email us at <a href="mailto:' + form.dataset.mailto + '">' + form.dataset.mailto + '</a>.</span>';
      status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    window.location.href = href;
  });
})();
