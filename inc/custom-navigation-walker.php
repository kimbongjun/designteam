<?php

class Description_Walker extends Walker_Nav_Menu
{
    /**
     * Start the element output.
     *
     * @param  string $output Passed by reference. Used to append additional content.
     * @param  object $item   Menu item data object.
     * @param  int $depth     Depth of menu item. May be used for padding.
     * @param  array|object $args    Additional strings. Actually always an 
                                     instance of stdClass. But this is WordPress.
     * @return void
     */
    function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 )
    {        
        $classes     = empty ( $item->classes ) ? array () : (array) $item->classes;       

        $class_names = join(
            ''
        ,   apply_filters('nav_menu_css_class',array_filter( $classes ), $item)
        );        
        ! empty ( $class_names )
            and $class_names = ' class="'. esc_attr( $class_names) . '"';
        
        $output .= "<li id='menu-item-$item->ID' class='" .  implode(" ", $item->classes) . "' data-poster='".esc_attr( $item->attr_title )."' data-bg='".esc_attr( $item->description )."'>";
//        $attributes  = '';

        ! empty( $item->attr_title )
            and $attributes .= ' title="'  . esc_attr( $item->attr_title ) .'"';
        ! empty( $item->target )
            and $attributes .= ' target="' . esc_attr( $item->target     ) .'"';
        ! empty( $item->xfn )
            and $attributes .= ' rel="'    . esc_attr( $item->xfn        ) .'"';
        ! empty( $item->url )
            and $attributes .= ' href="'   . esc_attr( $item->url        ) .'"';

        //$icon = ( ! empty ( $item->attr_title )) ? '<span class='.esc_attr( $item->attr_title ).'></span>' : '';
        
        //$classname= (! empty ( $class_names )) ? '<span class="grade_number">'.$item->classes[0].'</span>' : '';
        // insert description for top level elements only
        // you may change this
        // $description = ( ! empty ( $item->description ) and 0 == $depth )
        //     ? '<small class="nav_desc">' . esc_attr( $item->description ) . '</small>' : '';

        $title = apply_filters( 'the_title', $item->title, $item->ID );
				
        $item_output = $args->before			
            . "<a href=".$item->url." class='main-menu-link' data-hover=".$title.">"
            . $args->link_before
            . '<span class="menu-title">'.$title.'</span>'
            . '</a> '
            . $args->link_after            
            . $args->after;

        // Since $output is called by reference we don't need to return anything.
        $output .= apply_filters(
            'walker_nav_menu_start_el'
        ,   $item_output
        ,   $item
        ,   $depth
        ,   $args
        );
    }
}