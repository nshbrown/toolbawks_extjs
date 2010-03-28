module ApplicationHelper
  # Optional parameters
  # 
  # theme [aero, grey, vista]
  # adapter [prototype, jquery, yui]
  # debug [boolean]
  
  def toolbawks_extjs_head(options = {})
    
    stylesheets = ['ext-all']
    javascripts = []
    
    # Theme
    # No Default
    stylesheets << 'ytheme-' + options[:theme] if ['aero', 'gray', 'vista'].include?(options[:theme])
    
    # Adapter
    # Default to prototype
    options[:adapter] = 'prototype' if !options[:adapter]
    javascripts << 'adapter/' + options[:adapter] + '/ext-' + options[:adapter] + '-adapter' if ['jquery', 'prototype', 'yui'].include?(options[:adapter])
    
    # Ext-all must be last
    javascripts << 'ext-all' + ((options[:debug] == true) ? '-debug' : '')
    
    head = ''
    
    stylesheets.each { |css| head << stylesheet_link_tag(css, :plugin => 'toolbawks_extjs') + "\n" }
    javascripts.each { |js| head << javascript_include_tag(js, :plugin => 'toolbawks_extjs') + "\n" }
    
    head
  end
end