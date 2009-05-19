default_run_options[:pty] = true
ssh_options[:forward_agent] = true

set :application, "ramune"
set :domain, "armin.calit2.uci.edu"

# this does NOT deploy via git
set :scm, :none
set :repository, 'bin-release/'
set :deploy_via, :copy

set :deploy_to, "/var/www/#{application}"


role :app, domain
role :web, domain
role :db,  domain, :primary => true

# deploy:setup OK
namespace :deploy do

  desc "Restart Application (not really)"
  task :restart, :roles => :app do
    # does nothing
  end
end