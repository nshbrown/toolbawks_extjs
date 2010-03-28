# Copyright (c) 2007 Nathaniel Brown
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.

module ToolbawksExtjs
  mattr_accessor :src_version
  self.src_version = '1.0.1'
  
  mattr_accessor :root
  self.root = File.join(RAILS_ROOT, 'vendor', 'plugins', 'toolbawks_extjs')
  
  mattr_accessor :path_ext
  self.path_ext = File.join(ToolbawksExtjs.root, 'src', "ext-#{ToolbawksExtjs.src_version}")
  
  mattr_accessor :path_assets
  self.path_assets = File.join(ToolbawksExtjs.root, 'assets')
  
  mattr_accessor :path_javascripts
  self.path_javascripts = File.join(ToolbawksExtjs.path_assets, 'javascripts')
  
  mattr_accessor :path_stylesheets
  self.path_stylesheets = File.join(ToolbawksExtjs.path_assets, 'stylesheets')
  
  mattr_accessor :path_images
  self.path_images = File.join(ToolbawksExtjs.path_assets, 'images')  
  
  def self.deploy_assets
    logger.info "[toolbawks_extjs] Deploying all the assets of EXT JS from #{ToolbawksExtjs.path_ext} based on the version set in EXT_VERSION (#{ToolbawksExtjs.src_version}) to the proper locations"
    
    # Extract all the EXT JS libraries to the proper locations
    path_to_current_src_version_info = File.join(ToolbawksExtjs.root, "assets", "VERSION")
    
    # TBI (To be implemented)
    # No need to clean the assets if it's already the latest version
    if File.exist?(path_to_current_src_version_info)
      current_src_version = File.open(File.join(ToolbawksExtjs.root, "assets", "VERSION"), 'r').readlines[0]

      # Clean assets if current version is different than the latest in the config
      if ToolbawksExtjs.src_version.to_s != current_src_version.to_s
        logger.info "[toolbawks_extjs] EXT assets deployed [#{current_src_version}] are not at the latest version [#{ToolbawksExtjs.src_version}]"
        
        # Clean the assets dir
        ToolbawksExtjs.clean_assets

        # Extract EXT src into the assets directory
        ToolbawksExtjs.extract_ext_assets
        logger.info "[toolbawks_extjs] Successfully extracted all EXT assets"
      else
        logger.info "[toolbawks_extjs] EXT Assets already at the latest version"
      end
    else
      logger.info "[toolbawks_extjs] This is the first time toolbawks_extjs has been run"
      
      # Extract EXT src into the assets directory
      ToolbawksExtjs.extract_ext_assets
      logger.info "[toolbawks_extjs] Successfully extracted all EXT assets"
    end
  end
  
  def self.update_version_file
    logger.info "[toolbawks_extjs] ... updating version file"
    
    version_file = File.join(self.path_assets, "VERSION")
    
    FileUtils.rm_f(version_file) if File.exists?(version_file)
    
    f = File.new(version_file, 'w+')
    f.write ToolbawksExtjs.src_version
    f.close
  end
  
  def self.create_warning_readme
    logger.info "[toolbawks_extjs] ... creating warning readme"
    warning_file = File.join(self.path_assets, "README")

    f = File.new(warning_file, 'w+')
    f.write "Do not put anything in this directory. Any and all files that are here will be removed after every restart."
    f.close

  end
  
  def self.clean_assets
    logger.info "[toolbawks_extjs] ... cleaning assets"
    FileUtils.rm_rf(Dir.glob(File.join(ToolbawksExtjs.path_assets, '*')))
    
    # Create warning file
    ToolbawksExtjs.create_warning_readme
  end

  def self.extract_ext_assets
    # Make sure our root directories exist
    FileUtils.mkdir_p(ToolbawksExtjs.path_stylesheets) if !File.directory?(ToolbawksExtjs.path_stylesheets)
    FileUtils.mkdir_p(ToolbawksExtjs.path_javascripts) if !File.directory?(ToolbawksExtjs.path_javascripts)
    FileUtils.mkdir_p(ToolbawksExtjs.path_javascripts) if !File.directory?(ToolbawksExtjs.path_javascripts)
    FileUtils.mkdir_p(File.join(ToolbawksExtjs.path_javascripts, 'adapter')) if !File.directory?(File.join(ToolbawksExtjs.path_javascripts, 'adapter'))
    FileUtils.mkdir_p(File.join(ToolbawksExtjs.path_javascripts, 'build')) if !File.directory?(File.join(ToolbawksExtjs.path_javascripts, 'build'))
    FileUtils.mkdir_p(File.join(ToolbawksExtjs.path_javascripts, 'package')) if !File.directory?(File.join(ToolbawksExtjs.path_javascripts, 'package'))
    
    # Copy over the EXT license
    FileUtils.cp_r(File.join(ToolbawksExtjs.path_ext, 'LICENSE.txt'), ToolbawksExtjs.path_assets)

    # Images
    logger.info "[toolbawks_extjs] ... copying images files"
    Engines.mirror_files_from(File.join(ToolbawksExtjs.path_ext, 'resources', 'images'), ToolbawksExtjs.path_images)

    # CSS
    logger.info "[toolbawks_extjs] ... copying CSS files"
    Engines.mirror_files_from(File.join(ToolbawksExtjs.path_ext, 'resources', 'css'), ToolbawksExtjs.path_stylesheets)
    
    # JavaScript
    logger.info "[toolbawks_extjs] ... copying JavaScript files"
    Engines.mirror_files_from(File.join(ToolbawksExtjs.path_ext, 'adapter'), File.join(ToolbawksExtjs.path_javascripts, 'adapter'))
    Engines.mirror_files_from(File.join(ToolbawksExtjs.path_ext, 'build'), File.join(ToolbawksExtjs.path_javascripts, 'build'))
    Engines.mirror_files_from(File.join(ToolbawksExtjs.path_ext, 'package'), File.join(ToolbawksExtjs.path_javascripts, 'package'))
    
    FileUtils.cp_r(Dir.glob(File.join(ToolbawksExtjs.path_ext, '*.js')), ToolbawksExtjs.path_javascripts)
    
    # Update the version file
    ToolbawksExtjs.update_version_file
  end
end
