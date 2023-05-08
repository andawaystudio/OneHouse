<!-- Toggle List View -->
<script>
let isGridView = true;

$('.toggle-grid-view').click(function() {
	toggleGridView()
});

$('.toggle-list-view').click(function() {
	toggleListView()
});

function toggleGridView() {
	$('.artist-list').removeClass('is--list-view');
  $('.artist-list-link.is--list-view').addClass('hide');
  $('.artist-list-link.is--grid-view').removeClass('hide');
  isGridView = true;
}

function toggleListView() {
	let currChar;
  
  $('.artist-list-label').each(function() {
  	const char = $(this).siblings('.h2').text().charAt(0);
  	$(this).text(char !== currChar ? currChar = char : '');
	});
  
	$('.artist-list').addClass('is--list-view');
  $('.artist-list-link.is--list-view').removeClass('hide');
  $('.artist-list-link.is--grid-view').addClass('hide');
  isGridView = false;
}
</script>