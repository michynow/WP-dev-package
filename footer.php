<footer class="container">
    <div class="footer-links">
        <?php wp_nav_menu(array('theme_location' => 'footer-menu')); ?>
        <div class="footer-social">
        </div>
    </div>
    <div class="footer-info">
        <div class="footer-info-desc">
        </div>
    </div>
</footer>
<?php wp_footer(); ?>
<script src="<?php echo get_bloginfo('template_directory'); ?>/assets/js/script.js"></script>
</script>
</body>

</html>